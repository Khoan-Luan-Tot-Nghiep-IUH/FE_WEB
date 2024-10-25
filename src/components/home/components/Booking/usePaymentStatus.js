import { useState, useEffect, useCallback } from 'react';

const usePaymentStatus = (orderCode, initialPollingInterval = 5000, maxAttempts = 60) => {
    const [status, setStatus] = useState('pending');
    const [attempts, setAttempts] = useState(0);
    const [error, setError] = useState(null);

    const checkStatus = useCallback(async () => {
        if (!orderCode) return;
        
        try {
            const response = await fetch(`/api/payment-status/${orderCode}`);
            const data = await response.json();
            
            if (data.success) {
                setStatus('success');
                return true;
            } else if (data.status === 'failed') {
                setStatus('failed');
                setError(data.message);
                return true;
            }
            return false;
        } catch (err) {
            setError(err.message);
            return false;
        }
    }, [orderCode]);

    useEffect(() => {
        if (!orderCode || status === 'success' || status === 'failed') return;

        const pollPayment = async () => {
            const intervalId = setInterval(async () => {
                const shouldStop = await checkStatus();
                setAttempts(prev => prev + 1);
                
                if (shouldStop || attempts >= maxAttempts) {
                    clearInterval(intervalId);
                    if (attempts >= maxAttempts) {
                        setStatus('timeout');
                        setError('Timeout checking payment status');
                    }
                }
            }, initialPollingInterval);

            return () => clearInterval(intervalId);
        };

        pollPayment();
    }, [orderCode, status, attempts, checkStatus, maxAttempts, initialPollingInterval]);

    return { status, error };
};

export default usePaymentStatus;