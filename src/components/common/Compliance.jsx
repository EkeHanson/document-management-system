import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DocumentTextIcon, 
  ShieldCheckIcon, 
  ChartBarIcon, 
  ClockIcon, 
  ArrowDownTrayIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  FunnelIcon, 
} from '@heroicons/react/24/outline';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Chip,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  Grid,
  Card,
  CardContent, CircularProgress
} from '@mui/material';

const Compliance = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDocId, setExpandedDocId] = useState(null);
  const navigate = useNavigate();
  
  // Mock data since we don't have the context
  const [complianceDocuments, setComplianceDocuments] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Mock data fetch
        const mockData = [
          {
            id: 'doc-001',
            title: 'Safety Compliance Report 2023',
            description: 'Annual safety compliance documentation',
            status: 'compliant',
            standard: 'OSHA',
            lastUpdated: '2023-05-15',
            nextReview: '2024-05-15'
          },
          {
            id: 'doc-002',
            title: 'Environmental Impact Assessment',
            description: 'Project environmental compliance documentation',
            status: 'pending_review',
            standard: 'EPA',
            lastUpdated: '2023-03-10',
            nextReview: '2023-09-10'
          },
          {
            id: 'doc-003',
            title: 'Data Privacy Policy',
            description: 'Company data handling and privacy standards',
            status: 'non_compliant',
            standard: 'GDPR',
            lastUpdated: '2022-11-20',
            nextReview: '2023-05-20'
          }
        ];
        setComplianceDocuments(mockData);
      } catch (error) {
        console.error('Failed to fetch compliance documents:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const toggleExpand = (docId) => {
    setExpandedDocId(expandedDocId === docId ? null : docId);
  };

  const filteredDocuments = complianceDocuments.filter(doc => {
    const matchesFilter = filter === 'all' || doc.status === filter;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery) || 
                         doc.description.toLowerCase().includes(searchQuery) ||
                         doc.standard.toLowerCase().includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const complianceStandards = ['OSHA', 'EPA', 'GDPR', 'ISO-9001', 'HIPAA'];

  const getStatusColor = (status) => {
    switch(status) {
      case 'compliant': return 'success';
      case 'non_compliant': return 'error';
      case 'pending_review': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.paper', p: 3 }}>
      <Box sx={{ maxWidth: 'xl', mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ShieldCheckIcon style={{ width: 32, height: 32, color: '#1976d2', marginRight: 16 }} />
          <Box>
            <Typography variant="h4" component="h1">
              Compliance Management
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Track and manage all compliance documents and standards
            </Typography>
          </Box>
        </Box>

        {/* Breadcrumbs */}
        <Box sx={{ mb: 3 }}>
          <Button onClick={() => navigate('/dashboard')}>Dashboard</Button>
          <Typography component="span" sx={{ mx: 1 }}>/</Typography>
          <Typography component="span" color="text.primary">Compliance</Typography>
        </Box>

        {/* Filter Section */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search documents..."
              InputProps={{
                startAdornment: <MagnifyingGlassIcon style={{ width: 20, height: 20, marginRight: 8 }} />
              }}
              onChange={handleSearch}
            />
            <Select
              value={filter}
              onChange={handleFilterChange}
              startAdornment={<FunnelIcon style={{ width: 20, height: 20, marginRight: 8 }} />}
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="compliant">Compliant</MenuItem>
              <MenuItem value="non_compliant">Non-Compliant</MenuItem>
              <MenuItem value="pending_review">Pending Review</MenuItem>
            </Select>
            <Select
              value="all"
              sx={{ minWidth: 180 }}
              startAdornment={<ShieldCheckIcon style={{ width: 20, height: 20, marginRight: 8 }} />}
            >
              <MenuItem value="all">All Standards</MenuItem>
              {complianceStandards.map(standard => (
                <MenuItem key={standard} value={standard}>{standard}</MenuItem>
              ))}
            </Select>
          </Box>
        </Paper>

        {/* Documents Table */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress size={40} />
          </Box>
        ) : filteredDocuments.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <DocumentTextIcon style={{ width: 48, height: 48, color: 'text.disabled', marginBottom: 2 }} />
            <Typography variant="h6" gutterBottom>
              No compliance documents found
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Try adjusting your search or filter criteria
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => navigate('/documents/upload?type=compliance')}
              sx={{ mt: 2 }}
            >
              Upload Compliance Document
            </Button>
          </Paper>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Document</TableCell>
                  <TableCell>Standard</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell>Next Review</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <React.Fragment key={doc.id}>
                    <TableRow hover>
                      <TableCell>
                        <Typography fontWeight="medium">{doc.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{doc.description}</Typography>
                      </TableCell>
                      <TableCell>{doc.standard}</TableCell>
                      <TableCell>
                        <Chip 
                          label={doc.status.replace('_', ' ')} 
                          color={getStatusColor(doc.status)} 
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{doc.lastUpdated}</TableCell>
                      <TableCell>{doc.nextReview}</TableCell>
                      <TableCell>
                        <Button 
                          onClick={() => toggleExpand(doc.id)}
                          endIcon={expandedDocId === doc.id ? <ChevronUpIcon style={{ width: 20 }} /> : <ChevronDownIcon style={{ width: 20 }} />}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedDocId === doc.id && (
                      <TableRow>
                        <TableCell colSpan={6} sx={{ backgroundColor: 'action.hover' }}>
                          <Box sx={{ p: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>Document Details</Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={6}>
                                <Typography variant="body2"><strong>Title:</strong> {doc.title}</Typography>
                                <Typography variant="body2"><strong>Description:</strong> {doc.description}</Typography>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Typography variant="body2"><strong>Standard:</strong> {doc.standard}</Typography>
                                <Typography variant="body2"><strong>Status:</strong> {doc.status}</Typography>
                              </Grid>
                            </Grid>
                            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                              <Button variant="outlined" startIcon={<ArrowDownTrayIcon style={{ width: 16 }} />}>
                                Download
                              </Button>
                              <Button variant="outlined" onClick={() => navigate(`/documents/edit/${doc.id}`)}>
                                Edit
                              </Button>
                            </Box>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DocumentTextIcon style={{ width: 24, height: 24, color: '#1976d2', marginRight: 2 }} />
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Compliance Docs
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {complianceDocuments.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ShieldCheckIcon style={{ width: 24, height: 24, color: '#4caf50', marginRight: 2 }} />
                  <Typography variant="subtitle2" color="text.secondary">
                    Up-to-date Documents
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {complianceDocuments.filter(d => d.status === 'compliant').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ClockIcon style={{ width: 24, height: 24, color: '#ff9800', marginRight: 2 }} />
                  <Typography variant="subtitle2" color="text.secondary">
                    Due for Review
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {complianceDocuments.filter(d => d.status === 'pending_review').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Compliance;