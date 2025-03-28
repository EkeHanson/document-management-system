// src/components/projects/ProjectStatistics.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Statistic, Progress } from 'antd';
import { 
  FileDoneOutlined, 
  FileSyncOutlined, 
  FileExclamationOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import './ProjectCard.css';

const ProjectStatistics = ({ project }) => {
  const {
    totalDocuments = 0,
    approvedDocuments = 0,
    pendingDocuments = 0,
    overdueDocuments = 0,
    teamMembers = 0,
    completionPercentage = 0
  } = project;

  const documentApprovalRate = totalDocuments > 0 
    ? Math.round((approvedDocuments / totalDocuments) * 100) 
    : 0;

  return (
    <div className="project-statistics">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card>
            <Statistic
              title="Total Documents"
              value={totalDocuments}
              prefix={<FileDoneOutlined />}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card>
            <Statistic
              title="Approval Rate"
              value={documentApprovalRate}
              suffix="%"
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card>
            <Statistic
              title="Team Members"
              value={teamMembers}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Card title="Document Status">
            <Row gutter={16}>
              <Col span={8}>
                <div className="stat-badge approved">
                  <FileDoneOutlined />
                  <span>{approvedDocuments} Approved</span>
                </div>
              </Col>
              <Col span={8}>
                <div className="stat-badge pending">
                  <FileSyncOutlined />
                  <span>{pendingDocuments} Pending</span>
                </div>
              </Col>
              <Col span={8}>
                <div className="stat-badge overdue">
                  <FileExclamationOutlined />
                  <span>{overdueDocuments} Overdue</span>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Card title="Project Completion">
            <Progress 
              percent={completionPercentage}
              status={completionPercentage === 100 ? 'success' : 'active'}
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
            />
            <div className="progress-meta">
              <ClockCircleOutlined /> 
              <span>{completionPercentage}% complete</span>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

ProjectStatistics.propTypes = {
  project: PropTypes.shape({
    totalDocuments: PropTypes.number,
    approvedDocuments: PropTypes.number,
    pendingDocuments: PropTypes.number,
    overdueDocuments: PropTypes.number,
    teamMembers: PropTypes.number,
    completionPercentage: PropTypes.number
  }).isRequired
};

export default ProjectStatistics;