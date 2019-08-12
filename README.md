# Campaign Case Study

### Building & running

`yarn start` to start a webserver locally and run the app

`yarn test` to run the unit tests

`yarn docker-build` to build a docker image

`yarn docker-run` to run the built image (accessible under http://127.0.0.1:9000)

### Bootstrapping

I usually use `create-react-app` for the initial bootstrapping as I did here as well. 
It creates a usable code-structure that requires minor tweaking, is widely accepted and understood by pretty much all React developers.

The project was set up with Typescript, as static code-analysis has significant advantages and lets you discover a lot of 
potential runtime-issues during compile-time. 

### Layout / Design

For the layout I chose material-ui, as it is a modern and easy to use UI interface. It also makes it easy to create responsive designs, so I made sure that the campaign overview works on mobile viewports as well.

I tried to keep everything as minimal as possible, spacings large to ensure good readability while avoiding any distracting elements.

### Serving the files / Docker

I chose the latest LTS node version as an image to build the app inside docker.
For the container serving the data, I chose the same image with the serve package. 
While nginx would have been much faster at serving static, it would have required additional setup work and complicated the process.

Since the goal was to have a package that I could ship to production, I assumed the existance of CloudFlare (or similar) in production 
as an additional caching layer infront of the application, as every production system should have.
Due to the resources being cached by the CDN, it is no longer required to have an extremely fast server, so we can value ease of use over speed.

While Docker on its own is a widely-regarded standard solution, if the entire technology stack were up to me, I would certainly choose an
orchestration layer such as Kubernetes or Docker Swarm, simply to have better control over the deployments and services.

### Automated Tests

In writing unit tests I did not aim for a 100% coverage but instead tried to aim for a proper
coverage of all crucial features (such as actions, filters, validations, etc.).
For me this requires meaningful tests rather than putting the focus on the percentage of coverage. 

### Known issues

- Deprecation warning of `componentWillMount` and `componentWillReceiveProps`. 
This is caused by the react-moment dependency, which as of yet has not been updated as per React recommendations.
Due to time constraints I was unable to create a pull-request on Github to use an updated version. 
There are no functional limitations as long as a React version prior to 1.7 is used.
- The data format uses an uppercase `"Budget"` property, this is something I would normally have fixed, but as the format was specified in the 
requirements document for this case study, I left it as it is to remain consistent. 
