import {
    TableRow,
    TableCell,
    IconButton

} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete';

function TransactionsTableItem({ name, id, date, amount, handleDeleteTransaction, gain }) {


    return (
        <TableRow>
            <TableCell
                align="left"
            >
                {name}
            </TableCell>
            <TableCell
                align="right"
            >
                {gain ? "+" : "-"}${amount}
            </TableCell>
            <TableCell
                align="right"
            >
                {date}
            </TableCell>
            <TableCell
                align="right"
            >
                <IconButton
                    onClick={(e) => {handleDeleteTransaction(id, amount)}}
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default TransactionsTableItem;