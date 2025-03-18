import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Divider } from '@mui/material'
import { useEffect, useState, KeyboardEvent } from 'react'

interface ChordTableProps {
  onChordSelect: (chord: string, isRootColumn: boolean) => void
  selectedChord: string
  showingScale: boolean
  alignMinorScale: boolean
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

const ChordTable = ({ onChordSelect, selectedChord, showingScale, alignMinorScale }: ChordTableProps) => {
  const [focusPosition, setFocusPosition] = useState({ row: 0, col: 0 })

  // Calculate actual row numbers accounting for the divider
  const MAJOR_SCALE_ROW = 0;
  const MINOR_SCALE_ROW = 1;
  const DIVIDER_ROW = 2;
  const FIRST_CHORD_ROW = 3;

  const selectChordAtPosition = (row: number, col: number) => {
    // Skip the divider row
    if (row === DIVIDER_ROW) {
      return;
    }
    
    const root = rootNotes[col];
    
    if (row === MAJOR_SCALE_ROW) {
      onChordSelect(root, true);
    } else if (row === MINOR_SCALE_ROW) {
      onChordSelect(root + 'm', true);
    } else {
      const chordIndex = row - FIRST_CHORD_ROW;
      const chord = commonChords[chordIndex];
      onChordSelect(root + chord.symbol, false);
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const totalRows = FIRST_CHORD_ROW + commonChords.length;
    const maxCol = rootNotes.length - 1;

    let newRow = focusPosition.row;
    let newCol = focusPosition.col;

    switch (event.key) {
      case 'ArrowUp':
        do {
          newRow = newRow > 0 ? newRow - 1 : totalRows - 1;
        } while (newRow === DIVIDER_ROW); // Skip divider row
        break;
      case 'ArrowDown':
        do {
          newRow = newRow < totalRows - 1 ? newRow + 1 : 0;
        } while (newRow === DIVIDER_ROW); // Skip divider row
        break;
      case 'ArrowLeft':
        newCol = newCol > 0 ? newCol - 1 : maxCol;
        break;
      case 'ArrowRight':
        newCol = newCol < maxCol ? newCol + 1 : 0;
        break;
    }

    if (newRow !== focusPosition.row || newCol !== focusPosition.col) {
      setFocusPosition({ row: newRow, col: newCol });
      selectChordAtPosition(newRow, newCol);
    }
  }

  useEffect(() => {
    // Find the currently selected item and set the focus position
    if (selectedChord) {
      const root = selectedChord.charAt(0) + (selectedChord.charAt(1) === '#' ? '#' : '');
      const symbol = selectedChord.slice(root.length);
      const colIndex = rootNotes.indexOf(root);
      
      let rowIndex;
      if (showingScale) {
        rowIndex = symbol === 'm' ? MINOR_SCALE_ROW : MAJOR_SCALE_ROW;
      } else {
        rowIndex = FIRST_CHORD_ROW + commonChords.findIndex(chord => chord.symbol === symbol);
      }

      if (colIndex !== -1 && rowIndex !== -1) {
        setFocusPosition({ row: rowIndex, col: colIndex });
      }
    }
  }, [selectedChord, showingScale]);

  const getMinorScaleRoots = () => {
    if (!alignMinorScale) {
      return rootNotes;
    }
    // Shift the minor scale roots by 3 semitones down to align with their relative major
    return rootNotes.map((_, index) => rootNotes[(index - 3 + 12) % 12]);
  };

  return (
    <TableContainer 
      component={Paper} 
      tabIndex={0}
      onKeyDown={handleKeyDown}
      sx={{ outline: 'none' }}
    >
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Major Scale
            </TableCell>
            {rootNotes.map((root) => (
              <TableCell
                key={root}
                align="center"
                sx={{
                  cursor: 'pointer',
                  backgroundColor: showingScale && selectedChord === root ? 'primary.main' : 'background.paper',
                  color: showingScale && selectedChord === root ? 'primary.contrastText' : 'text.primary',
                  border: showingScale && (selectedChord === root || selectedChord === rootNotes[(rootNotes.indexOf(root) - 3 + 12) % 12] + 'm') ? '2px solid' : 'none',
                  borderColor: 'secondary.main',
                  borderBottom: '1px solid',
                  borderBottomColor: 'divider',
                }}
                onClick={() => onChordSelect(root, true)}
              >
                {root}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Minor Scale
            </TableCell>
            {getMinorScaleRoots().map((root) => (
              <TableCell
                key={root}
                align="center"
                sx={{
                  cursor: 'pointer',
                  backgroundColor: showingScale && selectedChord === root + 'm' ? 'primary.main' : 'background.paper',
                  color: showingScale && selectedChord === root + 'm' ? 'primary.contrastText' : 'text.primary',
                  border: showingScale && selectedChord === rootNotes[(rootNotes.indexOf(root) + 3) % 12] ? '2px solid' : 'none',
                  borderColor: 'secondary.main',
                }}
                onClick={() => onChordSelect(root + 'm', true)}
              >
                {root.toLowerCase()}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell colSpan={rootNotes.length + 1} sx={{ p: 0 }}>
              <Divider sx={{ borderColor: 'primary.main', borderWidth: 1 }} />
            </TableCell>
          </TableRow>
          {commonChords.map((chord) => (
            <TableRow key={chord.symbol}>
              <TableCell component="th" scope="row">
                {chord.name}
              </TableCell>
              {rootNotes.map((root) => {
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