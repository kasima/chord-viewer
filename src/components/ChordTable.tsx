import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { useEffect, useState, KeyboardEvent } from 'react'

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
  const [focusPosition, setFocusPosition] = useState({ row: 0, col: 0 })

  const selectChordAtPosition = (row: number, col: number) => {
    const root = rootNotes[row]
    if (col === 0) {
      onChordSelect(root, true)
    } else {
      const chord = commonChords[col - 1]
      onChordSelect(root + chord.symbol, false)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault()
    const maxRow = rootNotes.length - 1
    const maxCol = commonChords.length

    let newRow = focusPosition.row
    let newCol = focusPosition.col

    switch (event.key) {
      case 'ArrowUp':
        newRow = newRow > 0 ? newRow - 1 : maxRow
        break
      case 'ArrowDown':
        newRow = newRow < maxRow ? newRow + 1 : 0
        break
      case 'ArrowLeft':
        newCol = newCol > 0 ? newCol - 1 : maxCol
        break
      case 'ArrowRight':
        newCol = newCol < maxCol ? newCol + 1 : 0
        break
    }

    if (newRow !== focusPosition.row || newCol !== focusPosition.col) {
      setFocusPosition({ row: newRow, col: newCol })
      selectChordAtPosition(newRow, newCol)
    }
  }

  useEffect(() => {
    // Find the currently selected item and set the focus position
    if (selectedChord) {
      const root = selectedChord.charAt(0) + (selectedChord.charAt(1) === '#' ? '#' : '')
      const symbol = selectedChord.slice(root.length)
      const rowIndex = rootNotes.indexOf(root)
      const colIndex = showingScale ? 0 : commonChords.findIndex(chord => chord.symbol === symbol) + 1

      if (rowIndex !== -1) {
        setFocusPosition({ row: rowIndex, col: colIndex })
      }
    }
  }, [selectedChord, showingScale])

  return (
    <TableContainer 
      component={Paper} 
      tabIndex={0}
      onKeyDown={handleKeyDown}
      sx={{ outline: 'none' }}
    >
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