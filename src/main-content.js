import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '200%',
  },
}));


class MainContent extends Component{
    constructor(props){
        super(props)
           this.state = {
             news: [],
             news2: [],
             length: 0
            }
           
    }

    componentWillMount(){
        this.url = `https://glacial-plains-58754.herokuapp.com/api/us-news`; 
            fetch(this.url)
            .then(response2 => {
               if (response2.status === 200) {
                  console.log("Works");
                  // Parse the response body as JSON
                  return response2.json();

                } else if (response2.status === 404) {
                  // Not found 
                  throw Error('HTTP 404, Not found');
                } else {
                  // Some other situation
                  throw Error(`HTTP ${response2.status}, ${response2.statusText}`);
                }
             })
            .then(ResponseData2 => {
              this.setState({
                 news: ResponseData2
               });
               console.log(this.state.news);
            })
            .catch(error => {
               console.log(error)
            })

            this.url2 = `https://glacial-plains-58754.herokuapp.com/api/can-news`;
            fetch(this.url2)
            .then(response3 => {
               if (response3.status === 200) {
                  console.log("Works");
                  // Parse the response body as JSON
                  return response3.json();

                } else if (response3.status === 404) {
                  // Not found 
                  throw Error('HTTP 404, Not found');
                } else {
                  // Some other situation
                  throw Error(`HTTP ${response3.status}, ${response3.statusText}`);
                }
             })
            .then(ResponseData3 => {
              this.setState({
                 news2: ResponseData3,
               })
               console.log(this.state.news2);
            })
            .catch(error => {
               console.log(error)
            })
          
          
    }

    render(){
        return(
            <div className="row"> 
              <div className="col-md-2"></div>
                   <div className="col-md-8">
                      <CardContainer news={this.state.news} />
                      <CardContainer news={this.state.news2} />
                    </div>
            </div>
        );
    }
}
export default MainContent

const CardContainer = (props) => {
    let rows = props.news.map((news, index) =>{
         return(
              
               <div>
                       <ContentCard news={news} key={index} /> 
                       <br/> 
                   
               </div>  
                 
              
         );
     });
 
    return <div className="col-md-6">{rows}</div>
 }
 
 
 
 
 
 
 const ContentCard = props =>{
    const s = props.news;
    const classes = useStyles();
    return(
      <div className={classes.root}>
        <Paper className={classes.paper}>  
          <Grid container spacing={4}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <a href={s.url}> 
                <img className={classes.img} alt="complex" src={s.urlToImage} /></a>
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={4}>
                  <Grid item xs>
                    <Typography gutterBottom variant='h6'>
                      {s.title}
                    </Typography>
                    <Typography gutterBottom variant='subtitle2'>
                      {s.author}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {s.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {Date(s.publishedAt)}
                    </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant='button'>
                        <a className="btn btn-primary" href={s.url}>Read more</a>
                      </Typography>
                    </Grid>
                  </Grid>
                  </Grid>
                </Grid>
              </Paper>
           </div>

     );
 }