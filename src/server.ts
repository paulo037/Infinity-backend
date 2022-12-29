
import  {app}  from './app';
import {logger} from './logger';

app.listen(process.env.PORT || 3000, ()=> logger.info("executando..."))
