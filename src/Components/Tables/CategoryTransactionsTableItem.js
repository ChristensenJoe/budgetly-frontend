import {
    TableRow,
    TableCell

} from '@material-ui/core'


function CategoryTransactionsTableItem({name, date, amount, gain}) {
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
        </TableRow>
    );
}

export default CategoryTransactionsTableItem;