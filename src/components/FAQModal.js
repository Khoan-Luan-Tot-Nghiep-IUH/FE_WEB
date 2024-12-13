import React, { useState } from 'react';
import { Modal, Collapse, Typography, Spin } from 'antd';
import { useGetRootQuestionsQuery, useGetQuestionByIdQuery } from '../Redux/User/apiSlice';

const { Panel } = Collapse;
const { Text } = Typography;

const FAQModal = ({ isOpen, onClose }) => {
  const [currentQuestionId, setCurrentQuestionId] = useState(null);

  // Lấy danh sách câu hỏi cấp gốc
  const { data: rootQuestions = [], isLoading: isRootLoading } = useGetRootQuestionsQuery();

  // Lấy câu hỏi chi tiết theo ID
  const { data: detailedQuestion, isLoading: isDetailLoading } = useGetQuestionByIdQuery(currentQuestionId, {
    skip: !currentQuestionId, // Bỏ qua nếu không có ID
  });

  // Khi nhấn vào câu trả lời để chuyển đến câu hỏi tiếp theo
  const handleAnswerClick = (nextQuestionId) => {
    if (nextQuestionId) {
      console.log('Chuyển đến câu hỏi ID:', nextQuestionId); // Log kiểm tra
      setCurrentQuestionId(nextQuestionId);
    }
  };

  // Hiển thị danh sách câu trả lời
  const renderAnswers = (answers) => {
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return <p>Không có câu trả lời nào.</p>;
    }

    return (
      <ul>
        {answers.map((answer) => (
          <li key={answer._id || answer.text}>
            <Text
              onClick={() => handleAnswerClick(answer.nextQuestionId)}
              style={{
                cursor: answer.nextQuestionId ? 'pointer' : 'default',
                color: answer.nextQuestionId ? '#1890ff' : 'inherit',
              }}
            >
              {answer.text}
            </Text>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Modal
      title="Câu hỏi thường gặp (FAQ)"
      visible={isOpen}
      onCancel={() => {
        setCurrentQuestionId(null); // Reset trạng thái khi đóng modal
        onClose();
      }}
      footer={null}
      width={700}
    >
      {isRootLoading || isDetailLoading ? (
        <Spin tip="Đang tải câu hỏi..." />
      ) : currentQuestionId && detailedQuestion ? (
        // Hiển thị câu hỏi chi tiết
        <div>
          <Typography.Title level={4}>{detailedQuestion?.data?.question || 'Không có câu hỏi'}</Typography.Title>
          {renderAnswers(detailedQuestion?.data?.answers)}
          <Text
            onClick={() => setCurrentQuestionId(null)} // Quay lại danh sách câu hỏi cấp gốc
            style={{ cursor: 'pointer', color: '#1890ff', marginTop: '20px', display: 'block' }}
          >
            Quay lại danh sách câu hỏi
          </Text>
        </div>
      ) : (
        // Hiển thị danh sách câu hỏi cấp gốc
        <Collapse accordion>
          {rootQuestions?.data?.map((faq) => (
            <Panel header={faq.question} key={faq._id}>
              {renderAnswers(faq.answers)}
            </Panel>
          ))}
        </Collapse>
      )}
    </Modal>
  );
};

export default FAQModal;
