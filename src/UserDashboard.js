import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Avatar,
    CircularProgress,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Stack,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    LinearProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    createTheme,
    ThemeProvider,
    CssBaseline,
    useMediaQuery,
    Chip,
    InputAdornment,
    Snackbar,
    Alert,
    Divider
} from '@mui/material';
import {
    Home as HomeIcon,
    Description as DocumentIcon,
    Settings as SettingsIcon,
    ExitToApp as LogoutIcon,
    CloudUpload as UploadIcon,
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    DriveFileMove as DocumentUploadIcon,
    Download as DownloadIcon,
    InfoOutlined as InfoIcon,
    CheckCircleOutline as CheckIcon,
    ErrorOutline as ErrorIcon,
    Close as CloseIcon,
    Delete as DeleteIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import logo from './logodxc.png';
import './UserDashboard.css';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#BB86FC',
        },
        secondary: {
            main: '#03DAC6',
        },
        background: {
            default: '#121212',
            paper: '#1E1E1E',
        },
        text: {
            primary: '#E0E0E0',
            secondary: '#B0B0B0',
        },
        error: {
            main: '#CF6679',
        },
        success: {
            main: '#66BB6A',
        },
    },
    typography: {
        fontFamily: 'Montserrat, sans-serif',
        h5: {
            fontWeight: 600,
            color: '#BB86FC',
        },
        h6: {
            fontWeight: 500,
            color: '#E0E0E0',
        },
        body1: {
            color: '#B0B0B0',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(90deg, #121212, #212121)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: '#1E1E1E',
                    borderRight: '1px solid rgba(255,255,255,0.1)',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(187, 134, 252, 0.1)',
                        borderLeft: '4px solid #BB86FC',
                        '& .MuiListItemIcon-root': {
                            color: '#BB86FC',
                        },
                        '& .MuiListItemText-primary': {
                            color: '#BB86FC',
                            fontWeight: 600,
                        },
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(187, 134, 252, 0.05)',
                    },
                    transition: 'background-color 0.3s ease-in-out, border-left 0.3s ease-in-out',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#282828',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                    borderRadius: '12px',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '10px 20px',
                    transition: 'all 0.3s ease-in-out',
                },
                containedPrimary: {
                    background: 'linear-gradient(45deg, #BB86FC 30%, #6200EE 90%)',
                    '&:hover': {
                        boxShadow: '0 5px 15px rgba(187, 134, 252, 0.4)',
                        transform: 'translateY(-2px)',
                        filter: 'brightness(1.1)',
                    },
                },
                outlinedPrimary: {
                    borderColor: '#BB86FC',
                    color: '#BB86FC',
                    '&:hover': {
                        backgroundColor: 'rgba(187, 134, 252, 0.1)',
                        transform: 'translateY(-2px)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        color: '#E0E0E0',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.2) !important',
                    },
                    '& .MuiInputLabel-root': {
                        color: '#B0B0B0 !important',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#BB86FC !important',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#BB86FC !important',
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        color: '#E0E0E0',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.2) !important',
                    },
                    '& .MuiInputLabel-root': {
                        color: '#B0B0B0 !important',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#BB86FC !important',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#BB86FC !important',
                    },
                    '& .MuiSvgIcon-root': {
                        color: '#B0B0B0',
                    },
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: '#333333',
                    '& .MuiTableCell-head': {
                        color: '#E0E0E0',
                        fontWeight: 600,
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderColor: 'rgba(255,255,255,0.08)',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#1E1E1E',
                    borderRadius: '16px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    color: '#BB86FC',
                    fontWeight: 700,
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    paddingBottom: '16px',
                    marginBottom: '16px',
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                bar: {
                    backgroundColor: '#BB86FC',
                },
                root: {
                    backgroundColor: 'rgba(187, 134, 252, 0.2)',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    margin: '0 8px 8px 0',
                },
            },
        },
    },
});

const UserDashboard = () => {
    const [documents, setDocuments] = useState([]);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [uploadedDocuments, setUploadedDocuments] = useState([]);
    const [formData, setFormData] = useState({
        description: '',
        documentType: 'Other',
        classification: 'Public'
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [documentToDelete, setDocumentToDelete] = useState(null);

    const isMobile = useMediaQuery(darkTheme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const showSnackbar = (message, severity = 'success') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Token manquant. Veuillez vous reconnecter.');
                setIsLoading(false);
                return;
            }

            const userResponse = await axios.get('http://localhost:5001/api/users/auth/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserData(userResponse.data);

            if (activeTab === 1) {
                const docsResponse = await axios.get('http://localhost:5001/api/documents/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (docsResponse.data.success) {
                    setDocuments(docsResponse.data.data);
                } else {
                    setError("Échec lors de la récupération des documents.");
                }
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            setError(err.response?.data?.message || 'Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5001/api/documents/search?query=${encodeURIComponent(searchQuery)}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.success) {
                setSearchResults(response.data.data);
                showSnackbar(`${response.data.data.length} résultats trouvés`);
            } else {
                setSearchResults([]);
                setError(response.data.message || 'Erreur lors de la recherche');
            }
        } catch (err) {
            console.error("Search error:", err);
            setError(err.response?.data?.message || 'Erreur lors de la recherche');
            setSearchResults([]);
            showSnackbar('Erreur lors de la recherche', 'error');
        } finally {
            setIsSearching(false);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
    };

    const handleDeleteClick = (document) => {
        setDocumentToDelete(document);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!documentToDelete) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5001/api/documents/${documentToDelete._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Supprimer des résultats de recherche si présent
            setSearchResults(prev => prev.filter(doc => doc._id !== documentToDelete._id));

            // Supprimer de la liste principale
            setDocuments(prev => prev.filter(doc => doc._id !== documentToDelete._id));

            showSnackbar('Document supprimé avec succès');
        } catch (err) {
            console.error("Delete error:", err);
            showSnackbar('Erreur lors de la suppression du document', 'error');
        } finally {
            setDeleteDialogOpen(false);
            setDocumentToDelete(null);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleDownload = async (documentId, originalName) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5001/api/documents/${documentId}/download`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', originalName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error downloading file:", error);
            showSnackbar("Erreur lors du téléchargement du fichier", 'error');
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files.length) {
            const newFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...newFiles]);
            setUploadStatus('idle');
            setError('');
            setUploadedDocuments([]);
        }
    };

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            setError('Veuillez sélectionner au moins un fichier');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Session expirée, veuillez vous reconnecter');
            return;
        }

        try {
            setUploadStatus('uploading');
            setUploadProgress(0);

            const uploadPromises = files.map(file => {
                const data = new FormData();
                data.append('file', file);
                data.append('title', file.name.replace(/\.[^/.]+$/, ""));
                data.append('description', formData.description);
                data.append('documentType', formData.documentType);
                data.append('classification', formData.classification);

                return axios.post('http://localhost:5001/api/documents/', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    },
                    onUploadProgress: (progressEvent) => {
                        const totalBytes = files.reduce((sum, f) => sum + f.size, 0);
                        const loadedBytes = progressEvent.loaded;
                        const progress = Math.round((loadedBytes * 100) / totalBytes);
                        setUploadProgress(progress);
                    }
                });
            });

            const responses = await Promise.all(uploadPromises);
            const successfulUploads = responses.filter(res => res.data.success);

            if (successfulUploads.length > 0) {
                setUploadStatus('success');
                setUploadedDocuments(successfulUploads.map(res => res.data.data));
                fetchData();
                showSnackbar(`${successfulUploads.length} document(s) uploadé(s) avec succès`);
            } else {
                throw new Error('Aucun fichier n\'a pu être uploadé');
            }
        } catch (err) {
            console.error('Upload error details:', err.response?.data || err.message);
            let errorMessage = 'Erreur lors de l\'upload';
            if (err.response) {
                if (err.response.status === 500) {
                    errorMessage = 'Erreur serveur - Veuillez contacter l\'administrateur';
                } else if (err.response.data?.message) {
                    errorMessage = err.response.data.message;
                }
            }
            setError(errorMessage);
            setUploadStatus('error');
            showSnackbar(errorMessage, 'error');
        }
    };

    const resetUploadForm = () => {
        setFiles([]);
        setFormData({
            description: '',
            documentType: 'Other',
            classification: 'Public'
        });
        setUploadedDocuments([]);
        setUploadStatus('idle');
        setError('');
        setUploadProgress(0);
        setUploadDialogOpen(false);
    };

    const displayedDocuments = searchResults.length > 0 ? searchResults : documents;

    const drawer = (
        <Box>
            <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
                <img src={logo} alt="Logo" style={{ maxWidth: '80%', height: 'auto', maxHeight: '80px' }} />
            </Toolbar>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
            <List>
                {[
                    { text: "Accueil", icon: <DashboardIcon />, index: 0 },
                    { text: "Documents", icon: <DocumentIcon />, index: 1 },
                    { text: "Paramètres", icon: <SettingsIcon />, index: 2 }
                ].map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            selected={activeTab === item.index}
                            onClick={() => {
                                setActiveTab(item.index);
                                if (isMobile) setMobileOpen(false);
                                handleClearSearch();
                            }}
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(187, 134, 252, 0.1)',
                                    borderLeft: '4px solid #BB86FC',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: activeTab === item.index ? '#BB86FC' : 'text.primary' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} primaryTypographyProps={{ color: activeTab === item.index ? '#BB86FC' : 'text.primary' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding sx={{ mt: 2 }}>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon sx={{ color: 'error.main' }}><LogoutIcon /></ListItemIcon>
                        <ListItemText primary="Déconnexion" primaryTypographyProps={{ color: 'error.main' }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    const tabContent = [
        userData && (
            <Box sx={{ p: { xs: 2, md: 3 }, animation: 'fadeIn 0.6s ease-out forwards' }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Bonjour, {userData.name} ! 👋</Typography>
                <Typography variant="body1" sx={{ mt: 1, mb: 3 }}>Bienvenue sur votre espace personnel. Voici un aperçu de vos activités.</Typography>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, md: 4 }} mt={3}>
                    <Paper className="dashboard-card" sx={{ p: 3, flex: 1, backgroundColor: '#282828' }}>
                        <Typography variant="h6" sx={{ color: 'secondary.main', mb: 1 }}>Documents</Typography>
                        <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700 }}>{documents.length}</Typography>
                        <Typography variant="body2" color="text.secondary">documents au total</Typography>
                    </Paper>
                    <Paper className="dashboard-card" sx={{ p: 3, flex: 1, backgroundColor: '#282828' }}>
                        <Typography variant="h6" sx={{ color: 'secondary.main', mb: 1 }}>Rôle</Typography>
                        <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700 }}>{userData.role}</Typography>
                        <Typography variant="body2" color="text.secondary">niveau d'accès</Typography>
                    </Paper>
                </Stack>
            </Box>
        ),
        <Box sx={{ p: { xs: 2, md: 3 }, animation: 'fadeIn 0.6s ease-out forwards' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
                <Typography variant="h5" gutterBottom sx={{ mb: { xs: 1, md: 0 } }}>Mes Documents 📁</Typography>
                <Stack direction="row" spacing={2} width={{ xs: '100%', md: 'auto' }}>
                    <TextField
                        placeholder="Rechercher dans les documents..."
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: searchQuery && (
                                <InputAdornment position="end">
                                    <IconButton size="small" onClick={handleClearSearch}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ flex: 1, minWidth: 250 }}
                    />
                    <Button
                        variant="contained"
                        startIcon={<DocumentUploadIcon />}
                        onClick={() => setUploadDialogOpen(true)}
                        sx={{
                            background: 'linear-gradient(45deg, #03DAC6 30%, #00C4B4 90%)',
                            '&:hover': {
                                boxShadow: '0 5px 15px rgba(3, 218, 198, 0.4)',
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        Uploader
                    </Button>
                </Stack>
            </Box>

            {error && <Typography color="error.main" sx={{ mb: 2 }} className="error-message">{error}</Typography>}

            {isSearching ? (
                <Box display="flex" justifyContent="center" my={4}>
                    <CircularProgress />
                </Box>
            ) : displayedDocuments.length > 0 ? (
                <TableContainer component={Paper} sx={{ mt: 3, borderRadius: '12px' }} className="table-container-shadow">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Titre</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Classification</TableCell>
                                <TableCell>Nom du fichier</TableCell>
                                <TableCell>Taille</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedDocuments.map((doc) => (
                                <TableRow key={doc._id} className="table-row-hover">
                                    <TableCell>{doc.title}</TableCell>
                                    <TableCell>{doc.documentType}</TableCell>
                                    <TableCell>{doc.classification}</TableCell>
                                    <TableCell>{doc.originalName}</TableCell>
                                    <TableCell>{formatFileSize(doc.fileSize)}</TableCell>
                                    <TableCell>{new Date(doc.uploadDate).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={1}>
                                            <Button
                                                variant="outlined"
                                                startIcon={<DownloadIcon />}
                                                onClick={() => handleDownload(doc._id, doc.originalName)}
                                                size="small"
                                                sx={{
                                                    borderColor: 'primary.main',
                                                    color: 'primary.main',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(187, 134, 252, 0.1)',
                                                    }
                                                }}
                                            >
                                                Télécharger
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => handleDeleteClick(doc)}
                                                size="small"
                                                sx={{
                                                    borderColor: 'error.main',
                                                    color: 'error.main',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(207, 102, 121, 0.1)',
                                                    }
                                                }}
                                            >
                                                Supprimer
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Paper sx={{ p: 3, mt: 3, textAlign: 'center', backgroundColor: '#282828' }} className="empty-state-card">
                    {searchQuery ? (
                        <>
                            <Typography variant="h6" color="text.secondary">Aucun résultat trouvé pour "{searchQuery}"</Typography>
                            <Button
                                variant="text"
                                onClick={handleClearSearch}
                                sx={{ mt: 2 }}
                            >
                                Effacer la recherche
                            </Button>
                        </>
                    ) : (
                        <>
                            <Typography variant="h6" color="text.secondary">Aucun document disponible pour le moment.</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Uploadez votre premier document!</Typography>
                        </>
                    )}
                </Paper>
            )}
        </Box>,
        userData && (
            <Box sx={{ p: { xs: 2, md: 3 }, animation: 'fadeIn 0.6s ease-out forwards' }}>
                <Typography variant="h5" sx={{ mb: 3 }}>Paramètres du Compte ⚙️</Typography>
                <Paper sx={{ mt: 2, p: { xs: 2, md: 4 }, backgroundColor: '#282828' }} className="settings-card">
                    <Stack spacing={2}>
                        <Typography variant="h6" sx={{ color: 'primary.main' }}>Informations Personnelles</Typography>
                        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                        <Typography><strong>Nom complet:</strong> {userData.name}</Typography>
                        <Typography><strong>Email:</strong> {userData.email}</Typography>
                        <Typography><strong>Rôle:</strong> {userData.role}</Typography>
                        <Typography><strong>Membre depuis:</strong> {new Date(userData.createdAt).toLocaleDateString()}</Typography>
                    </Stack>
                    <Box mt={4} display="flex" gap={2}>
                        <Button variant="outlined">Changer le mot de passe</Button>
                        <Button variant="outlined">Modifier le profil</Button>
                    </Box>
                </Paper>
            </Box>
        )
    ];

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', height: '100vh', backgroundColor: darkTheme.palette.background.default }}>
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - 240px)` },
                        ml: { sm: `240px` },
                        display: { sm: 'none' },
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Dashboard
                        </Typography>
                        {userData && (
                            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ mr: 1, display: { xs: 'none', sm: 'block' } }}>{userData.name}</Typography>
                                <Avatar alt={userData.name} src="/static/images/avatar/1.jpg" sx={{ width: 32, height: 32, bgcolor: darkTheme.palette.primary.main }} />
                            </Box>
                        )}
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant={isMobile ? 'temporary' : 'permanent'}
                    open={isMobile ? mobileOpen : true}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: 240,
                            boxSizing: 'border-box',
                            background: darkTheme.palette.background.paper,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        overflowY: 'auto',
                        width: { sm: `calc(100% - 240px)` },
                        mt: { xs: '64px', sm: 0 },
                    }}
                >
                    <Toolbar sx={{ display: { xs: 'none', sm: 'block' } }} />
                    {isLoading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 64px)">
                            <CircularProgress sx={{ color: 'primary.main' }} />
                        </Box>
                    ) : (
                        tabContent[activeTab]
                    )}
                </Box>

                {/* Dialog d'upload */}
                <Dialog open={uploadDialogOpen} onClose={resetUploadForm} maxWidth="md" fullWidth>
                    <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <UploadIcon /> Uploader des documents
                    </DialogTitle>
                    <DialogContent>
                        {uploadStatus === 'success' ? (
                            <Box textAlign="center" py={4}>
                                <CheckIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} className="icon-pop-in" />
                                <Typography variant="h6" color="success.main" gutterBottom>
                                    Documents uploadés avec succès!
                                </Typography>
                                <Paper sx={{ p: 3, mt: 3, backgroundColor: '#282828' }} className="upload-summary-card">
                                    <Typography variant="subtitle1" sx={{ mb: 2 }}>Fichiers uploadés:</Typography>
                                    <Stack spacing={2}>
                                        {uploadedDocuments.map((doc, index) => (
                                            <Box key={index} sx={{ p: 2, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 1 }}>
                                                <Typography><strong>Titre:</strong> {doc.title}</Typography>
                                                <Typography><strong>Fichier:</strong> {doc.originalName}</Typography>
                                                <Typography><strong>Taille:</strong> {formatFileSize(doc.fileSize)}</Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Paper>
                                <Button
                                    variant="contained"
                                    onClick={resetUploadForm}
                                    sx={{ mt: 3, background: 'linear-gradient(45deg, #03DAC6 30%, #00C4B4 90%)' }}
                                >
                                    Uploader d'autres documents
                                </Button>
                            </Box>
                        ) : uploadStatus === 'error' ? (
                            <Box textAlign="center" py={4}>
                                <ErrorIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} className="icon-shake" />
                                <Typography variant="h6" color="error.main" gutterBottom>
                                    Erreur lors de l'upload des documents.
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                                    {error || "Veuillez réessayer ou contacter l'administrateur."}
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={resetUploadForm}
                                    sx={{ mt: 3, background: 'linear-gradient(45deg, #CF6679 30%, #B00020 90%)' }}
                                >
                                    Réessayer
                                </Button>
                            </Box>
                        ) : (
                            <Box py={2}>
                                {files.length === 0 ? (
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                        justifyContent="center"
                                        border="2px dashed"
                                        borderColor="rgba(255,255,255,0.3)"
                                        borderRadius={2}
                                        p={4}
                                        mb={3}
                                        textAlign="center"
                                        sx={{
                                            cursor: 'pointer',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                backgroundColor: 'rgba(187, 134, 252, 0.05)',
                                            },
                                            transition: 'all 0.3s ease-in-out',
                                        }}
                                        onClick={() => document.getElementById('file-upload-input').click()}
                                    >
                                        <UploadIcon fontSize="large" sx={{ mb: 2, color: 'primary.main' }} />
                                        <Typography variant="h6" gutterBottom>
                                            Glissez-déposez vos fichiers ici
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 2 }}>
                                            ou
                                        </Typography>
                                        <Button variant="outlined">
                                            Sélectionner des fichiers
                                        </Button>
                                        <input
                                            type="file"
                                            id="file-upload-input"
                                            hidden
                                            onChange={handleFileChange}
                                            multiple
                                        />
                                    </Box>
                                ) : (
                                    <Box mb={3}>
                                        <Typography variant="subtitle1" sx={{ mb: 2 }}>Fichiers sélectionnés:</Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                            {files.map((file, index) => (
                                                <Chip
                                                    key={index}
                                                    label={`${file.name} (${formatFileSize(file.size)})`}
                                                    onDelete={() => removeFile(index)}
                                                    deleteIcon={<CloseIcon />}
                                                    sx={{ m: 0.5 }}
                                                    variant="outlined"
                                                />
                                            ))}
                                        </Box>
                                        <Button
                                            variant="text"
                                            onClick={() => document.getElementById('file-upload-input').click()}
                                            sx={{ mt: 1 }}
                                        >
                                            Ajouter plus de fichiers
                                        </Button>
                                        <input
                                            type="file"
                                            id="file-upload-input"
                                            hidden
                                            onChange={handleFileChange}
                                            multiple
                                        />
                                    </Box>
                                )}

                                <Stack spacing={3}>
                                    <TextField
                                        label="Description (optionnelle)"
                                        variant="outlined"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        fullWidth
                                        multiline
                                        rows={3}
                                    />
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Type de document</InputLabel>
                                        <Select
                                            name="documentType"
                                            value={formData.documentType}
                                            onChange={handleInputChange}
                                            label="Type de document"
                                        >
                                            <MenuItem value="Report">Rapport</MenuItem>
                                            <MenuItem value="Presentation">Présentation</MenuItem>
                                            <MenuItem value="Contract">Contrat</MenuItem>
                                            <MenuItem value="Other">Autre</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Classification</InputLabel>
                                        <Select
                                            name="classification"
                                            value={formData.classification}
                                            onChange={handleInputChange}
                                            label="Classification"
                                        >
                                            <MenuItem value="Public">Public</MenuItem>
                                            <MenuItem value="Internal">Interne</MenuItem>
                                            <MenuItem value="Confidential">Confidentiel</MenuItem>
                                            <MenuItem value="Secret">Secret</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>

                                {uploadStatus === 'uploading' && (
                                    <Box mt={3}>
                                        <Typography variant="body2" sx={{ mb: 1 }}>Upload en cours...</Typography>
                                        <LinearProgress variant="determinate" value={uploadProgress} />
                                        <Typography variant="body2" sx={{ mt: 1, textAlign: 'right' }}>
                                            {uploadProgress}%
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        {uploadStatus !== 'success' && uploadStatus !== 'error' && (
                            <>
                                <Button onClick={resetUploadForm} color="secondary">
                                    Annuler
                                </Button>
                                <Button
                                    onClick={handleUpload}
                                    variant="contained"
                                    disabled={files.length === 0 || uploadStatus === 'uploading'}
                                    startIcon={<UploadIcon />}
                                >
                                    {uploadStatus === 'uploading' ? 'Upload en cours...' : 'Uploader'}
                                </Button>
                            </>
                        )}
                    </DialogActions>
                </Dialog>

                {/* Dialog de confirmation de suppression */}
                <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                    <DialogTitle>Confirmer la suppression</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Êtes-vous sûr de vouloir supprimer le document "{documentToDelete?.title}" ?
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Cette action est irréversible.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                            Annuler
                        </Button>
                        <Button
                            onClick={confirmDelete}
                            color="error"
                            variant="contained"
                            startIcon={<DeleteIcon />}
                        >
                            Supprimer
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Snackbar pour les notifications */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert
                        onClose={handleSnackbarClose}
                        severity={snackbarSeverity}
                        sx={{ width: '100%' }}
                        iconMapping={{
                            success: <CheckIcon fontSize="inherit" />,
                            error: <ErrorIcon fontSize="inherit" />,
                            info: <InfoIcon fontSize="inherit" />,
                            warning: <ErrorIcon fontSize="inherit" />,
                        }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    );
};

export default UserDashboard;