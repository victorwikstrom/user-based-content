import { createStyles, makeStyles, Typography } from "@material-ui/core";

interface Props {
  pageName: string;
}

function PageHeading(props: Props) {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        padding: "1rem 0",
        marginBottom: "2rem",
      },
      loginContainer: {
        display: "flex",
        alignItems: "center",
      },
    })
  );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5">{props.pageName}</Typography>
    </div>
  );
}

export default PageHeading;
