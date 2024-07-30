import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';

interface TPaginationComponentProp {
    current: number;
    total: number;
    pageSize: number;
    onChange: PaginationProps['onChange'];
}

const PaginationComponent: React.FC<TPaginationComponentProp> = ({ current, total, pageSize, onChange }) => {
    return (
        <Pagination
            showQuickJumper
            current={current}
            total={total}
            pageSize={pageSize}
            onChange={onChange}
        />
    );
};

export default PaginationComponent;