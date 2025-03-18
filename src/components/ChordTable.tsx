import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

interface ChordTableProps {
  onChordSelect: (chord: string, isRootColumn: boolean) => void
  selectedChord: string
  showingScale: boolean
}

const commonChords = [
  { name: 'Major', symbol: '' },
  { name: 'Minor', symbol: 'm' },
  { name: 'Dominant 7', symbol: '7' },
  { name: 'Minor 7', symbol: 'm7' },
  { name: 'Major 7', symbol: 'maj7' },
  { name: 'Diminished', symbol: 'dim' },
  { name: 'Augmented', symbol: 'aug' },
]

const rootNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

const ChordTable = ({ onChordSelect, selectedChord, showingScale }: ChordTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Major Scale</TableCell>
            {commonChords.map((chord) => (
              <TableCell key={chord.symbol} align="center">
                {chord.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rootNotes.map((root) => (
            <TableRow key={root}>
              <TableCell
                component="th"
                scope="row"
                sx={{
                  cursor: 'pointer',
                  backgroundColor: showingScale && selectedChord === root ? 'primary.main' : 'background.paper',
                  color: showingScale && selectedChord === root ? 'primary.contrastText' : 'text.primary',
                }}
                onClick={() => onChordSelect(root, true)}
              >
                {root}
              </TableCell>
              {commonChords.map((chord) => {
                const fullChord = root + chord.symbol
                return (
                  <TableCell
                    key={fullChord}
                    align="center"
                    sx={{
                      cursor: 'pointer',
                      backgroundColor: !showingScale && selectedChord === fullChord ? 'primary.main' : 'background.paper',
                      color: !showingScale && selectedChord === fullChord ? 'primary.contrastText' : 'text.primary',
                    }}
                    onClick={() => onChordSelect(fullChord, false)}
                  >
                    {fullChord}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ChordTable 