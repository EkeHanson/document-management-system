// import React, { useState, useEffect } from 'react';
// import {
//   BriefcaseIcon,
//   BuildingOfficeIcon,
//   MapPinIcon,
//   CurrencyDollarIcon,
//   ClockIcon,
//   AcademicCapIcon,
//   ArrowRightIcon,
//   XMarkIcon
// } from '@heroicons/react/24/outline';
// import { Dialog, Transition } from '@headlessui/react';
// import { Card, CardContent, CardHeader, Divider, Chip, Typography, Button, Skeleton } from '@mui/material';
// import { styled } from '@mui/material/styles';

// // Styled components
// const JobCard = styled(Card)(({ theme }) => ({
//   cursor: 'pointer',
//   transition: 'transform 0.2s, box-shadow 0.2s',
//   '&:hover': {
//     transform: 'translateY(-2px)',
//     boxShadow: theme.shadows[4]
//   }
// }));

// const FilterButton = styled(Button)(({ active }) => ({
//   textTransform: 'none',
//   marginRight: '8px',
//   marginBottom: '8px',
//   backgroundColor: active ? '#3b82f6' : '#f3f4f6',
//   color: active ? 'white' : '#4b5563',
//   '&:hover': {
//     backgroundColor: active ? '#2563eb' : '#e5e7eb'
//   }
// }));

// /**
//  * Careers Page Component - Self-contained version
//  */
// const Careers = () => {
//   const [loading, setLoading] = useState(true);
//   const [jobs, setJobs] = useState([]);
//   const [filter, setFilter] = useState({
//     department: 'all',
//     location: 'all',
//     type: 'all'
//   });
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     // Simulate API fetch
//     const fetchJobs = async () => {
//       try {
//         // Mock data
//         const mockJobs = [
//           {
//             id: 1,
//             title: 'Senior Frontend Developer',
//             department: 'Engineering',
//             location: 'San Francisco, CA',
//             type: 'Full-time',
//             salary: '$120,000 - $150,000',
//             posted: '2023-05-15',
//             description: 'We are looking for an experienced React developer to join our team building our document management system.',
//             responsibilities: [
//               'Develop and maintain our document management system',
//               'Collaborate with designers and backend developers',
//               'Implement responsive UIs with attention to detail',
//               'Write clean, maintainable, and efficient code',
//               'Participate in code reviews and team discussions'
//             ],
//             requirements: [
//               '5+ years of React experience',
//               'Strong TypeScript skills',
//               'Experience with state management solutions (Redux, Context API)',
//               'Familiarity with modern frontend build pipelines',
//               'Experience with RESTful APIs and GraphQL'
//             ]
//           },
//           {
//             id: 2,
//             title: 'Document Control Specialist',
//             department: 'Operations',
//             location: 'Remote',
//             type: 'Full-time',
//             salary: '$80,000 - $100,000',
//             posted: '2023-06-01',
//             description: 'Manage document control processes for engineering projects in our DMS platform.',
//             responsibilities: [
//               'Maintain document control procedures and standards',
//               'Ensure compliance with industry regulations',
//               'Coordinate document reviews and approvals',
//               'Manage document workflows and version control',
//               'Train team members on document control processes'
//             ],
//             requirements: [
//               '3+ years experience in document management',
//               'Knowledge of engineering documentation standards',
//               'Excellent attention to detail',
//               'Strong organizational skills',
//               'Experience with document management systems'
//             ]
//           },
//           {
//             id: 3,
//             title: 'UX/UI Designer',
//             department: 'Design',
//             location: 'New York, NY',
//             type: 'Contract',
//             salary: '$90 - $120/hr',
//             posted: '2023-06-10',
//             description: 'Design intuitive interfaces for our document management platform.',
//             responsibilities: [
//               'Create wireframes, prototypes, and high-fidelity designs',
//               'Conduct user research and usability testing',
//               'Collaborate with product team to define requirements',
//               'Develop and maintain design systems',
//               'Ensure accessibility and responsive design principles'
//             ],
//             requirements: [
//               'Portfolio demonstrating relevant work',
//               '3+ years experience with design systems',
//               'Figma proficiency',
//               'Understanding of frontend development concepts',
//               'Experience with user research methodologies'
//             ]
//           }
//         ];
        
//         // Simulate network delay
//         await new Promise(resolve => setTimeout(resolve, 800));
//         setJobs(mockJobs);
//       } catch (error) {
//         console.error('Failed to fetch job postings:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchJobs();
//   }, []);

//   const handleFilterChange = (name, value) => {
//     setFilter(prev => ({ ...prev, [name]: value }));
//   };

//   const filteredJobs = jobs.filter(job => {
//     return (
//       (filter.department === 'all' || job.department === filter.department) &&
//       (filter.location === 'all' || job.location.includes(filter.location)) &&
//       (filter.type === 'all' || job.type === filter.type)
//     );
//   });

//   const openJobDetails = (job) => {
//     setSelectedJob(job);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   // Extract filter options from jobs data
//   const departments = ['all', ...new Set(jobs.map(job => job.department))];
//   const locations = ['all', ...new Set(jobs.map(job => job.location.split(',')[0]))];
//   const jobTypes = ['all', ...new Set(jobs.map(job => job.type))];

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Page Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
//             <BriefcaseIcon className="h-8 w-8 text-blue-600" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
//             Careers at DMS
//           </h1>
//           <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
//             Join our team and help build the future of document management
//           </p>
//         </div>

//         <div className="lg:grid lg:grid-cols-3 lg:gap-8">
//           {/* Filters and Sidebar */}
//           <div className="lg:col-span-1 space-y-6">
//             {/* Filter Section */}
//             <div className="bg-white shadow rounded-lg p-6">
//               <h2 className="text-lg font-medium text-gray-900 mb-4">Filter Jobs</h2>
              
//               <div className="mb-6">
//                 <h3 className="text-sm font-medium text-gray-700 mb-2">Department</h3>
//                 <div className="flex flex-wrap">
//                   {departments.map(dept => (
//                     <FilterButton
//                       key={dept}
//                       variant="contained"
//                       size="small"
//                       active={filter.department === dept}
//                       onClick={() => handleFilterChange('department', dept)}
//                     >
//                       {dept === 'all' ? 'All Departments' : dept}
//                     </FilterButton>
//                   ))}
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <h3 className="text-sm font-medium text-gray-700 mb-2">Location</h3>
//                 <div className="flex flex-wrap">
//                   {locations.map(loc => (
//                     <FilterButton
//                       key={loc}
//                       variant="contained"
//                       size="small"
//                       active={filter.location === loc}
//                       onClick={() => handleFilterChange('location', loc)}
//                     >
//                       {loc === 'all' ? 'All Locations' : loc}
//                     </FilterButton>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-sm font-medium text-gray-700 mb-2">Job Type</h3>
//                 <div className="flex flex-wrap">
//                   {jobTypes.map(type => (
//                     <FilterButton
//                       key={type}
//                       variant="contained"
//                       size="small"
//                       active={filter.type === type}
//                       onClick={() => handleFilterChange('type', type)}
//                     >
//                       {type === 'all' ? 'All Types' : type}
//                     </FilterButton>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Why Join Us Section */}
//             <div className="bg-white shadow rounded-lg p-6">
//               <h2 className="text-lg font-medium text-gray-900 mb-4">Why Join Us?</h2>
//               <div className="space-y-4">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0">
//                     <BuildingOfficeIcon className="h-5 w-5 text-blue-500" />
//                   </div>
//                   <div className="ml-3">
//                     <p className="text-sm text-gray-700">
//                       Work on challenging projects with industry leaders
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0">
//                     <AcademicCapIcon className="h-5 w-5 text-blue-500" />
//                   </div>
//                   <div className="ml-3">
//                     <p className="text-sm text-gray-700">
//                       Continuous learning and professional development
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0">
//                     <CurrencyDollarIcon className="h-5 w-5 text-blue-500" />
//                   </div>
//                   <div className="ml-3">
//                     <p className="text-sm text-gray-700">
//                       Competitive compensation and benefits package
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0">
//                     <ClockIcon className="h-5 w-5 text-blue-500" />
//                   </div>
//                   <div className="ml-3">
//                     <p className="text-sm text-gray-700">
//                       Flexible work arrangements and work-life balance
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Job Listings */}
//           <div className="mt-8 lg:mt-0 lg:col-span-2">
//             {loading ? (
//               <div className="space-y-6">
//                 {[...Array(3)].map((_, i) => (
//                   <Skeleton key={i} variant="rectangular" height={180} animation="wave" />
//                 ))}
//               </div>
//             ) : filteredJobs.length === 0 ? (
//               <div className="text-center py-12 bg-white shadow rounded-lg">
//                 <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400" />
//                 <h3 className="mt-2 text-lg font-medium text-gray-900">No openings match your criteria</h3>
//                 <p className="mt-1 text-sm text-gray-500">
//                   Try adjusting your filters or check back later for new opportunities.
//                 </p>
//                 <div className="mt-6">
//                   <Button
//                     variant="outlined"
//                     onClick={() => setFilter({ department: 'all', location: 'all', type: 'all' })}
//                   >
//                     Reset Filters
//                   </Button>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {filteredJobs.map(job => (
//                   <JobCard key={job.id} onClick={() => openJobDetails(job)}>
//                     <CardHeader
//                       title={job.title}
//                       subheader={
//                         <div className="flex items-center space-x-4 mt-1">
//                           <span className="flex items-center text-sm text-gray-600">
//                             <BuildingOfficeIcon className="h-4 w-4 mr-1" />
//                             {job.department}
//                           </span>
//                           <span className="flex items-center text-sm text-gray-600">
//                             <MapPinIcon className="h-4 w-4 mr-1" />
//                             {job.location}
//                           </span>
//                           <Chip label={job.type} size="small" />
//                         </div>
//                       }
//                       action={
//                         <Button
//                           endIcon={<ArrowRightIcon className="h-4 w-4" />}
//                           size="small"
//                         >
//                           View
//                         </Button>
//                       }
//                     />
//                     <CardContent>
//                       <Typography variant="body2" color="text.secondary">
//                         {job.description}
//                       </Typography>
//                       <div className="mt-4 flex items-center">
//                         <CurrencyDollarIcon className="h-5 w-5 text-gray-500 mr-1" />
//                         <Typography variant="body2" color="text.secondary">
//                           {job.salary}
//                         </Typography>
//                         <div className="ml-auto">
//                           <Typography variant="caption" color="text.secondary">
//                             Posted: {job.posted}
//                           </Typography>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </JobCard>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Job Details Modal */}
//       <Transition appear show={isModalOpen} as={React.Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={React.Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={React.Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   <div className="flex justify-between items-start">
//                     <Dialog.Title
//                       as="h3"
//                       className="text-2xl font-bold leading-6 text-gray-900"
//                     >
//                       {selectedJob?.title}
//                     </Dialog.Title>
//                     <button
//                       type="button"
//                       className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
//                       onClick={closeModal}
//                     >
//                       <XMarkIcon className="h-6 w-6" />
//                     </button>
//                   </div>

//                   {selectedJob && (
//                     <div className="mt-6 space-y-6">
//                       <div className="flex flex-wrap gap-4">
//                         <div className="flex items-center">
//                           <BuildingOfficeIcon className="h-5 w-5 text-gray-500 mr-2" />
//                           <span>{selectedJob.department}</span>
//                         </div>
//                         <div className="flex items-center">
//                           <MapPinIcon className="h-5 w-5 text-gray-500 mr-2" />
//                           <span>{selectedJob.location}</span>
//                         </div>
//                         <div className="flex items-center">
//                           <CurrencyDollarIcon className="h-5 w-5 text-gray-500 mr-2" />
//                           <span>{selectedJob.salary}</span>
//                         </div>
//                         <div className="flex items-center">
//                           <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
//                           <span>{selectedJob.type}</span>
//                         </div>
//                       </div>

//                       <Divider />

//                       <div>
//                         <h4 className="text-lg font-medium text-gray-900 mb-2">Job Description</h4>
//                         <p className="text-gray-700">{selectedJob.description}</p>
//                       </div>

//                       <div className="grid md:grid-cols-2 gap-6">
//                         <div>
//                           <h4 className="text-lg font-medium text-gray-900 mb-2">Responsibilities</h4>
//                           <ul className="list-disc pl-5 space-y-1 text-gray-700">
//                             {selectedJob.responsibilities.map((item, i) => (
//                               <li key={i}>{item}</li>
//                             ))}
//                           </ul>
//                         </div>
//                         <div>
//                           <h4 className="text-lg font-medium text-gray-900 mb-2">Requirements</h4>
//                           <ul className="list-disc pl-5 space-y-1 text-gray-700">
//                             {selectedJob.requirements.map((item, i) => (
//                               <li key={i}>{item}</li>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>

//                       <div className="flex justify-end pt-4">
//                         <Button
//                           variant="contained"
//                           size="large"
//                           onClick={() => {
//                             // In a real app, this would link to an application form
//                             alert(`Applying for ${selectedJob.title}`);
//                             closeModal();
//                           }}
//                         >
//                           Apply Now
//                         </Button>
//                       </div>
//                     </div>
//                   )}
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </div>
//   );
// };

// export default Careers;import React, { useState } from 'react';
import { 
    BriefcaseIcon,
    BuildingOfficeIcon,
    MapPinIcon,
    CurrencyDollarIcon,
    ClockIcon,
    AcademicCapIcon,
    ArrowRightIcon
  } from '@heroicons/react/24/outline';
  import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Paper,
    TextField,
    Select,
    MenuItem,
    Divider,
    Chip,
    Modal,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    CircularProgress
  } from '@mui/material';
  
  const Careers = () => {
    const [filter, setFilter] = useState({
      department: 'all',
      location: 'all',
      type: 'all'
    });
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    // Mock data
    const jobs = [
      {
        id: 1,
        title: 'Senior Frontend Developer',
        department: 'Engineering',
        location: 'San Francisco, CA',
        type: 'Full-time',
        salary: '$120,000 - $150,000',
        posted: '2023-05-15',
        description: 'We are looking for an experienced React developer to join our team...',
        responsibilities: [
          'Develop and maintain our document management system',
          'Collaborate with designers and backend developers',
          'Implement responsive UIs with attention to detail'
        ],
        requirements: [
          '5+ years of React experience',
          'Strong TypeScript skills',
          'Experience with state management solutions'
        ]
      },
      {
        id: 2,
        title: 'Document Control Specialist',
        department: 'Operations',
        location: 'Remote',
        type: 'Full-time',
        salary: '$80,000 - $100,000',
        posted: '2023-06-01',
        description: 'Manage document control processes for engineering projects...',
        responsibilities: [
          'Maintain document control procedures',
          'Ensure compliance with industry standards',
          'Coordinate document reviews and approvals'
        ],
        requirements: [
          'Experience in document management',
          'Knowledge of engineering documentation',
          'Attention to detail'
        ]
      },
      {
        id: 3,
        title: 'UX/UI Designer',
        department: 'Design',
        location: 'New York, NY',
        type: 'Contract',
        salary: '$90 - $120/hr',
        posted: '2023-06-10',
        description: 'Design intuitive interfaces for our document management platform...',
        responsibilities: [
          'Create wireframes and prototypes',
          'Conduct user research',
          'Collaborate with product team'
        ],
        requirements: [
          'Portfolio of relevant work',
          'Experience with design systems',
          'Figma proficiency'
        ]
      }
    ];
  
    const handleFilterChange = (name, value) => {
      setFilter(prev => ({ ...prev, [name]: value }));
    };
  
    const filteredJobs = jobs.filter(job => {
      return (
        (filter.department === 'all' || job.department === filter.department) &&
        (filter.location === 'all' || job.location.includes(filter.location)) &&
        (filter.type === 'all' || job.type === filter.type)
      );
    });
  
    const openJobDetails = (job) => {
      setSelectedJob(job);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedJob(null);
    };
  
    const departments = [...new Set(jobs.map(job => job.department))];
    const locations = [...new Set(jobs.map(job => job.location.split(',')[0]))];
    const jobTypes = [...new Set(jobs.map(job => job.type))];
  
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.paper', p: 3 }}>
        <Box sx={{ maxWidth: 'xl', mx: 'auto' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <BriefcaseIcon style={{ width: 32, height: 32, color: '#1976d2', marginRight: 16 }} />
            <Box>
              <Typography variant="h4" component="h1">
                Careers at DMS
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Join our team and help build the future of document management
              </Typography>
            </Box>
          </Box>
  
          {/* Breadcrumbs */}
          <Box sx={{ mb: 3 }}>
            <Button onClick={() => navigate('/')}>Home</Button>
            <Typography component="span" sx={{ mx: 1 }}>/</Typography>
            <Typography component="span" color="text.primary">Careers</Typography>
          </Box>
  
          <Grid container spacing={3}>
            {/* Filters and Benefits */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>Filter Jobs</Typography>
                <TextField
                  fullWidth
                  label="Search"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Select
                  fullWidth
                  value={filter.department}
                  onChange={(e) => handleFilterChange('department', e.target.value)}
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="all">All Departments</MenuItem>
                  {departments.map(dept => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>
                <Select
                  fullWidth
                  value={filter.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="all">All Locations</MenuItem>
                  {locations.map(loc => (
                    <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                  ))}
                </Select>
                <Select
                  fullWidth
                  value={filter.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                >
                  <MenuItem value="all">All Job Types</MenuItem>
                  {jobTypes.map(type => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </Paper>
  
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Why Join Us?</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <BuildingOfficeIcon style={{ width: 20, height: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary="Work on challenging projects with industry leaders" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AcademicCapIcon style={{ width: 20, height: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary="Continuous learning and professional development" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CurrencyDollarIcon style={{ width: 20, height: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary="Competitive compensation and benefits" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
  
            {/* Job Listings */}
            <Grid item xs={12} md={8}>
              {filteredJobs.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                  <BriefcaseIcon style={{ width: 48, height: 48, color: 'text.disabled', marginBottom: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    No current openings match your criteria
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Check back later or try different filters
                  </Typography>
                </Paper>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {filteredJobs.map(job => (
                    <Card key={job.id} variant="outlined">
                      <CardContent>
                        <Typography variant="h6" component="h2" gutterBottom>
                          {job.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                          <Chip label={job.department} size="small" />
                          <Chip label={job.location} size="small" icon={<MapPinIcon style={{ width: 14 }} />} />
                          <Chip label={job.type} size="small" />
                        </Box>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {job.description}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">
                            <CurrencyDollarIcon style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 4 }} />
                            {job.salary}
                          </Typography>
                          <Button 
                            endIcon={<ArrowRightIcon style={{ width: 16 }} />}
                            onClick={() => openJobDetails(job)}
                          >
                            View Details
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
  
        {/* Job Details Modal */}
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          aria-labelledby="job-details-modal"
          aria-describedby="job-details-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', md: '70%' },
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            overflowY: 'auto',
            outline: 'none'
          }}>
            {selectedJob && (
              <>
                <Typography variant="h4" component="h2" gutterBottom>
                  {selectedJob.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                  <Chip label={selectedJob.department} />
                  <Chip label={selectedJob.location} icon={<MapPinIcon style={{ width: 14 }} />} />
                  <Chip label={selectedJob.type} />
                  <Chip 
                    label={selectedJob.salary} 
                    icon={<CurrencyDollarIcon style={{ width: 14 }} />}
                    color="success"
                  />
                </Box>
  
                <Typography variant="body1" paragraph>
                  {selectedJob.description}
                </Typography>
  
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>Responsibilities</Typography>
                    <List dense>
                      {selectedJob.responsibilities.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <ArrowRightIcon style={{ width: 16 }} />
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>Requirements</Typography>
                    <List dense>
                      {selectedJob.requirements.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <ArrowRightIcon style={{ width: 16 }} />
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
  
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <Button variant="outlined" onClick={closeModal}>
                    Close
                  </Button>
                  <Button variant="contained" color="primary">
                    Apply Now
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Modal>
      </Box>
    );
  };
  
  export default Careers;