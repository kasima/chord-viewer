import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Container, Box, Typography, Paper } from '@mui/material'
import PianoKeyboard from './components/PianoKeyboard'
import ChordTable from './components/ChordTable'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
})

const chordIntervals = {
  '': [0, 4, 7], // Major
  'm': [0, 3, 7], // Minor
  '7': [0, 4, 7, 10], // Dominant 7
  'm7': [0, 3, 7, 10], // Minor 7
  'maj7': [0, 4, 7, 11], // Major 7
  'dim': [0, 3, 6], // Diminished
  'aug': [0, 4, 8], // Augmented
}

const majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11] // Major scale intervals

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function App() {
  const [selectedChord, setSelectedChord] = useState<string>('C')
  const [showingScale, setShowingScale] = useState(false)

  const getMajorScaleNotes = (rootNote: string) => {
    const rootIndex = notes.indexOf(rootNote)
    return majorScaleIntervals.map(
      (interval) => `${notes[(rootIndex + interval) % 12]}4`
    )
  }

  const getHighlightedNotes = (chord: string) => {
    let rootNote = chord.charAt(0)
    if (chord.charAt(1) === '#') {
      rootNote = rootNote + '#'
    }
    
    // If we're showing a scale (only happens from root column clicks)
    if (showingScale) {
      return getMajorScaleNotes(rootNote)
    }

    const chordType = chord.slice(rootNote.length)
    const rootIndex = notes.indexOf(rootNote)
    
    return chordIntervals[chordType as keyof typeof chordIntervals].map(
      (interval) => `${notes[(rootIndex + interval) % 12]}4`
    )
  }

  const handleChordSelect = (chord: string, isRootColumn: boolean) => {
    setSelectedChord(chord)
    setShowingScale(isRootColumn)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Chord Viewer
          </Typography>
          <Paper sx={{ p: 2, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <PianoKeyboard highlightedNotes={getHighlightedNotes(selectedChord)} />
            </Box>
            <Typography variant="h5" align="center" gutterBottom>
              {selectedChord}
            </Typography>
          </Paper>
          <ChordTable
            selectedChord={selectedChord}
            onChordSelect={handleChordSelect}
            showingScale={showingScale}
          />
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
