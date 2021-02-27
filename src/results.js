import React, { Component } from 'react';
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
    width: 150,
    height: 200,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '300%',
    maxHeight: '400%',
  },
}));

class SearchResults extends Component{
  constructor(props){
    super(props)

    this.state = {
      length: 0,
      searchTerm: this.props.id,
      news: []
    }
  }

  componentDidMount(){
    
      this.url = `https://glacial-plains-58754.herokuapp.com/api/newsSearch/${this.props.id}`;
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
  }

    render(){

       const term = this.state.searchTerm;
        return(
           
           <div className="row">
               <div className="col-2-md"></div>
               <div className="col-8-md text-center">
                 <h2>Results for {term}</h2>
                 <br/>
                 <br/>
                 <br/>
               </div>
            

               <div className="row">
                 <CardContainer news={this.state.news}/>
              </div>
            </div>
        );
    }
}
export default SearchResults

const CardContainer = (props) => {
    let rows = props.news.map((news, index) =>{
         return(
               <div className="row">
                   <div className="col-2"></div>
                   <div className="col-8">
                       <ContentCard news={news} key={index} />  
                       <br/>
                       <br/>
                       <br/>
                   </div>
                   <div className="col-2"></div>
               </div>  
                 
              
         );
     });
 
    return <div className="col-6">{rows}</div>
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
          <Grid item md={12} sm container>
            <Grid item xs container direction="column" spacing={4}>
                <Grid item xs>
                  <Typography gutterBottom variant='h4'>
                    {s.title}
                  </Typography>
                  <Typography gutterBottom variant='h6'>
                    {s.author}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                      {s.description}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
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