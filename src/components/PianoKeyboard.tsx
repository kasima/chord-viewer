import { Box, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

interface PianoKeyboardProps {
  highlightedNotes: string[]
  rootNote?: string
}

const WhiteKey = styled(Paper)(({ theme }) => ({
  width: '40px',
  height: '150px',
  backgroundColor: '#fff',
  border: '1px solid #000',
  position: 'relative',
  cursor: 'pointer',
  '&.highlighted': {
    backgroundColor: theme.palette.primary.light,
  },
  '&.root': {
    backgroundColor: theme.palette.root.main,
  }
}))

// const BlackKey = styled(Paper)(({ theme }) => ({
//   width: '24px',
//   height: '90px',
//   backgroundColor: '#000',
//   position: 'absolute',
//   left: '28px',
//   zIndex: 1,
//   cursor: 'pointer',
//   '&.highlighted': {
//     backgroundColor: theme.palette.primary.dark,
//   }
// }))

const KeyLabel = styled(Typography)({
  position: 'absolute',
  bottom: '8px',
  width: '100%',
  textAlign: 'center',
  color: '#000',
  fontSize: '0.8rem',
  fontWeight: 'bold'
})

// Adjust BlackKey to position it on top of white keys
const BlackKey = styled(Paper)(({ theme }) => ({
  width: '24px',
  height: '90px',
  backgroundColor: '#000',
  position: 'absolute',
  top: 0,
  left: '28px',
  zIndex: 1,
  cursor: 'pointer',
  '&.highlighted': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&.root': {
    backgroundColor: theme.palette.root.dark,
  }
}))

const PianoKeyboard = ({ highlightedNotes, rootNote }: PianoKeyboardProps) => {
  const whiteNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  // const allNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const octave = 4

  const getKeyClassName = (note: string, octaveIndex: number) => {
    const fullNote = `${note}${octave + octaveIndex}`
    if (rootNote && note === rootNote && octaveIndex === 0) {
      return 'root'
    }
    return highlightedNotes.includes(fullNote) ? 'highlighted' : ''
  }

  return (
    <Box sx={{ position: 'relative', display: 'inline-block', p: 2 }}>
      {Array.from({ length: 2 }, (_, octaveIndex) => (
        <Box key={octaveIndex} sx={{ display: 'inline-block' }}>
          {whiteNotes.map((note) => (
            <Box 
              key={`${note}${octave + octaveIndex}`} 
              sx={{ 
                display: 'inline-block',
                position: 'relative',
                width: '40px'
              }}
            >
              <WhiteKey
                className={getKeyClassName(note, octaveIndex)}
              />
              <KeyLabel>
                {note}
              </KeyLabel>
              {/* Render black keys after certain white keys */}
              {['C', 'D', 'F', 'G', 'A'].includes(note) && (
                <BlackKey
                  className={getKeyClassName(note + '#', octaveIndex)}
                />
              )}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}

export default PianoKeyboard 