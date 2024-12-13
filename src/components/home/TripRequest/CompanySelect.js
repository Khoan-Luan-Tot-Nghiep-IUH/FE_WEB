import React from 'react';
import { Select, Spin, Typography } from 'antd';
import { useGetCompanyNamesQuery } from '../../../Redux/User/apiSlice';

const { Option } = Select;
const { Text } = Typography;

const CompanySelect = ({ selectedCompany, onSelectCompany }) => {
  const { data: apiResponse, isLoading, error } = useGetCompanyNamesQuery();
  const companies = apiResponse?.data || [];

  if (isLoading) return <Spin tip="Đang tải danh sách công ty..." />;
  if (error) return <Text type="danger">Không thể tải danh sách công ty. Vui lòng thử lại.</Text>;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Chọn công ty</label>
      <Select
        className="w-full"
        value={selectedCompany}
        onChange={onSelectCompany}
        placeholder="Chọn công ty"
        showSearch
        optionFilterProp="children"
      >
        {companies.map((company) => (
          <Option key={company.id} value={company.id}>
            {company.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default CompanySelect;
