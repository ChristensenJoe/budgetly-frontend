import {
    TableRow,
    TableCell,
    IconButton

} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete';

import {useState, useEffect} from 'react';

function TransactionsTableItem({ name, id, date, amount, handleDeleteTransaction, gain }) {

    const [mainCategory, setMainCategory] = useState([]);

    useEffect(() => {
        let isMounted = true;
        fetch(`http://localhost:9292/transactions/main_category/${id}`)
        .then(res => res.json())
        .then(data => {
            if(isMounted) {
                setMainCategory(data)
            }
        });

        return () => { isMounted = false }
    }, [id])

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
                {mainCategory.name}
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
                    onClick={(e) => { handleDeleteTransaction(id, amount) }}
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default TransactionsTableItem;