import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, LinearProgress, IconButton, Box, Typography, Chip } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { FileStatus } from '../types';

const getStatusColor = (status: FileStatus['status']) => {
  switch (status) {
    case 'uploading':
      return 'info';
    case 'completed':
      return 'success';
    case 'error':
      return 'error';
    case 'pending':
    default:
      return 'default';
  }
};

const getStatusIcon = (status: FileStatus['status']) => {
  switch (status) {
    case 'uploading':
      return <HourglassTopIcon sx={{ fontSize: 16 }} />;
    case 'completed':
      return <CheckCircleIcon sx={{ fontSize: 16 }} />;
    case 'error':
      return <ErrorIcon sx={{ fontSize: 16 }} />;
    case 'pending':
    default:
      return <React.Fragment></React.Fragment>;
  }
};

export const FileItem: React.FC<{ fileData: FileStatus }> = ({ fileData }) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton 
          edge="end" 
          onClick={() => fileData.onDelete?.(fileData.id)}
          disabled={fileData.status === 'uploading'}
        >
          <DeleteIcon />
        </IconButton>
      }
      sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 1 }}
    >
      <ListItemAvatar>
        <Avatar src={fileData.previewUrl} variant="rounded">
          <InsertDriveFileIcon />
        </Avatar>
      </ListItemAvatar>
      <Box sx={{ width: '100%', mr: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
          <ListItemText 
            primary={fileData.file.name} 
            secondary={`${(fileData.file.size / 1024).toFixed(1)} KB`}
            sx={{ m: 0 }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {fileData.status !== 'pending' && (
              <Chip
                icon={getStatusIcon(fileData.status)}
                label={`${fileData.progress}%`}
                size="small"
                color={getStatusColor(fileData.status)}
                variant="outlined"
              />
            )}
          </Box>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={fileData.progress} 
          sx={{ mt: 1, height: 6, borderRadius: 3 }} 
        />
      </Box>
    </ListItem>
  );
};