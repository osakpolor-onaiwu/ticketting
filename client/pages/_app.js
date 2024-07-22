import "bootstrap/dist/css/bootstrap.css";
import BuildClient from '../api/build-client'
import Headers from "../component/headers";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Headers currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async(appContext)=>{
  const client = BuildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");
  let pageProps = {};
  if(appContext.Component.getInitialProps){
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
  }

  return {
    pageProps,
    currentUser: data.currentUser 
  };
}

export default AppComponent;
