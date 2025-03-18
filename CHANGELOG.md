# Changelog

All notable changes to the chord-viewer project will be documented in this file.

## [0.1.3] - 2024-03-21

### Fixed
- Fixed white screen issue in chord table when changing rows by:
  - Updated table cell background colors to use proper theme values
  - Fixed text color contrast in unselected cells

## [0.1.2] - 2024-03-21

### Fixed
- Fixed black screen issue when selecting notes by:
  - Added explicit background colors to theme configuration
  - Removed conflicting background color styles
  - Improved dark theme consistency

## [0.1.1] - 2024-03-21

### Changed
- Improved piano keyboard visualization:
  - Fixed black key positioning to properly nest between white keys
  - Added note labels at the bottom of each white key
  - Improved overall key layout and spacing
  - Enhanced visual consistency of the keyboard

## [0.1.0] - 2024-03-21

### Added
- Initial release of the chord-viewer application
- Created a two-octave piano keyboard visualization (C4 to B5)
- Implemented a comprehensive chord table with common chord types:
  - Major
  - Minor
  - Dominant 7
  - Minor 7
  - Major 7
  - Diminished
  - Augmented
- Added interactive chord selection with visual feedback
- Implemented note highlighting on the piano keyboard for selected chords
- Created a modern dark theme UI using Material-UI components

### Technical Details
- Built with React + TypeScript + Vite
- Used Material-UI for component library and styling
- Implemented responsive design for various screen sizes
- Added smooth transitions and hover effects for better user experience

### Dependencies
- @mui/material
- @emotion/react
- @emotion/styled
- react
- typescript
- vite

### Features
- Real-time chord visualization
- Interactive piano keyboard
- Comprehensive chord table
- Visual feedback for selected chords
- Responsive layout
- Dark theme interface 