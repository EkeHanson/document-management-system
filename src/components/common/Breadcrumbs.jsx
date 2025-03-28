import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'react-feather';
import './Breadcrumbs.css';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="breadcrumbs">
      <Link to="/" className="breadcrumb-item">
        Home
      </Link>
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const formattedName = name.replace(/-/g, ' ');

        return isLast ? (
          <span key={name} className="breadcrumb-item active">
            <ChevronRight size={14} className="breadcrumb-separator" />
            {formattedName}
          </span>
        ) : (
          <Link key={name} to={routeTo} className="breadcrumb-item">
            <ChevronRight size={14} className="breadcrumb-separator" />
            {formattedName}
          </Link>
        );
      })}
    </div>
  );
};

export default Breadcrumbs; // This is the crucial default exportBreadcrumbs.css