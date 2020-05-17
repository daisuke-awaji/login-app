import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
)
interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void
}

/**
 *
 * 表の下部に配置する |< < > >| というボタンコンポーネント
 * @param props
 */
export function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles()
  const { count, page, rowsPerPage, onChangePage } = props
  return (
    <div className={classes.root}>
      <IconButton
        onClick={(event) => onChangePage(event, 0)}
        disabled={page === 0}
        aria-label="first page |<"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={(event) => onChangePage(event, page - 1)}
        disabled={page === 0}
        aria-label="previous page <"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={(event) => onChangePage(event, page + 1)}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page >"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={(event) => {
          const lastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1)
          onChangePage(event, lastPage)
        }}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page >|"
      >
        <LastPageIcon />
      </IconButton>
    </div>
  )
}
