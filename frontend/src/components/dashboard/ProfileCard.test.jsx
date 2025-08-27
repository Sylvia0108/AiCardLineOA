import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileCard from './ProfileCard';

// Mock the SVG imports
jest.mock('../../assets/figma/phone-icon.svg', () => 'phone-icon.svg');
jest.mock('../../assets/figma/edit-icon.svg', () => 'edit-icon.svg');
jest.mock('../../assets/figma/share-icon.svg', () => 'share-icon.svg');

describe('ProfileCard', () => {
  const mockProfile = {
    displayName: '王小明',
    pictureUrl: 'https://example.com/avatar.jpg',
    statusMessage: 'wang_little_ming'
  };

  test('renders loading state correctly', () => {
    render(<ProfileCard loading={true} />);
    expect(screen.getByText('載入中...')).toBeInTheDocument();
  });

  test('renders profile information correctly', () => {
    render(<ProfileCard profile={mockProfile} loading={false} />);
    
    expect(screen.getByText('王小明')).toBeInTheDocument();
    expect(screen.getByText('0900000000')).toBeInTheDocument();
    expect(screen.getByText('wang_little_ming')).toBeInTheDocument();
  });

  test('renders default values when profile is not provided', () => {
    render(<ProfileCard profile={null} loading={false} />);
    
    expect(screen.getByText('王小明')).toBeInTheDocument();
    expect(screen.getByText('wang_little_ming')).toBeInTheDocument();
  });

  test('renders action buttons', () => {
    render(<ProfileCard profile={mockProfile} loading={false} />);
    
    expect(screen.getByLabelText('Share Profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Edit Profile')).toBeInTheDocument();
  });

  test('renders user avatar', () => {
    render(<ProfileCard profile={mockProfile} loading={false} />);
    
    const avatar = screen.getByAltText('User Avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });
});
