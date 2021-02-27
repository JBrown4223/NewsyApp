import React,{Component} from 'react';
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

class MainPage extends Component{
      constructor(props){
        super(props)
           this.state = {
             isLoading: true,
             user: {
                _id: '',
                userName:'',
                password:'',
                email:'',
                history: []
             },
             value: '',
             news: [],
             news2: [],
             length: 0
            }
           
      }
        
        //User Api 
        url = `https://glacial-plains-58754.herokuapp.com/api/users/${this.props.id}`;
        
        componentDidMount() {
            // Get one
            fetch(this.url)
              .then(response => {
                // Optional...
                this.setState({ httpStatusCode: response.status, httpStatusOk: response.ok });
                if (response.ok) {
                  // Parse the response body as JSON
                  return response.json();
                } else if (response.status === 404) {
                  // Not found 
                  throw Error('HTTP 404, Not found');
                } else {
                  // Some other situation
                  throw Error(`HTTP ${response.status}, ${response.statusText}`);
                }
              })
              .then(responseData => {
                // "responseData" is an object; here, we're interested in its "data" property
                // Study the shape of the data in the reqres.in service
                this.setState({ user: responseData,
                                length: responseData.categories.length
                              });
                // Optional...
                console.log(responseData);
                console.log(this.state.length);
              })
              .catch(error => {
                // Handles an error thrown above, as well as network general errors
                console.log(error)
              });
                
          
            this.url2 = `https://glacial-plains-58754.herokuapp.com/api/userStories/${this.props.id}` 
            fetch(this.url2)
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

        render() {
           
            return (
              <div>
                  <div className="row">
                      <div className="col-2-md"></div>
                      <div className="col-8-md text-center">
                          <h2> Your Top Stories...</h2>
                      </div>
                  </div>

                  <div className="row">
                        <CardContainer news={this.state.news}/>
                        <CardContainer news={this.state.news2} />
                  
                  </div>
                  
                  
              </div> 
            );  
        }
}

export default MainPage

const CardContainer = (props) => {
   let rows = props.news.map((news, index) =>{
        return(
              <div className="row">
                  <div className="col-2"></div>
                  <div className="col-8">
                      <ContentCard news={news} key={index} />  
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
         <Grid container spacing={2}>
           <Grid item>
             <ButtonBase className={classes.image}>
                <a href={s.url}> 
                <img className={classes.img} alt="complex" src={s.urlToImage} /></a>
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                 <Grid item xs>
                    <Typography gutterBottom variant='h4'>
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

