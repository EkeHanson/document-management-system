import React from 'react';
import { Pagination as AntPagination } from 'antd';
import PropTypes from 'prop-types';
import './StatusBadge.css'; // Or use Tailwind classes directly

const Pagination = ({ 
  current,
  total,
  pageSize,
  onChange,
  showSizeChanger = true,
  showQuickJumper = false,
  showTotal = true,
  disabled = false,
  simple = false,
  className = ''
}) => {
  return (
    <div className={`custom-pagination ${className}`}>
      <AntPagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
        showSizeChanger={showSizeChanger}
        showQuickJumper={showQuickJumper}
        disabled={disabled}
        simple={simple}
        showTotal={showTotal ? (total, range) => (
          `${range[0]}-${range[1]} of ${total} items`
        ) : null}
        pageSizeOptions={['10', '20', '50', '100']}
      />
    </div>
  );
};

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  showSizeChanger: PropTypes.bool,
  showQuickJumper: PropTypes.bool,
  showTotal: PropTypes.bool,
  disabled: PropTypes.bool,
  simple: PropTypes.bool,
  className: PropTypes.string
};

export default Pagination;