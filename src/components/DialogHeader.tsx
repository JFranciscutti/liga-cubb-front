import { Button } from '@mui/material';
import Iconify from './iconify';

export interface DialogHeaderProps {
  label: string;
  onClick: () => void;
}

export default function DialogHeader({ label, onClick }: DialogHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <p>{label}</p>
      <Button onClick={onClick} sx={{ minWidth: 0, px: 1, color: 'black' }}>
        <Iconify icon="material-symbols:close" color={'white'} />
      </Button>
    </div>
  );
}
