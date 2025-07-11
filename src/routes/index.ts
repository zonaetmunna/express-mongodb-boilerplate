import { UserRoutes } from '@/modules/user/routes/user.routes';
import { Request, Response, Router } from 'express';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../config/swagger';
// import authRoutes from '../modules/auth/routes/auth.routes';

const router: Router = Router();

// Health check route
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// API Documentation Routes
router.use('/api-docs', swaggerUi.serve);

// Serve Swagger UI with custom options
router.get('/api-docs', swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Express API Documentation',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'list',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    syntaxHighlight: {
      theme: 'monokai'
    }
  }
}));

// Serve raw OpenAPI specification
router.get('/api-docs/openapi.yaml', (req: Request, res: Response) => {
  try {
    const openApiPath = path.join(__dirname, '../../docs/api/v1/openapi.yaml');
    const fileContents = fs.readFileSync(openApiPath, 'utf8');
    res.setHeader('Content-Type', 'application/yaml');
    res.send(fileContents);
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to load OpenAPI specification'
    });
  }
});

// Serve OpenAPI specification as JSON
router.get('/api-docs/openapi.json', (req: Request, res: Response) => {
  try {
    const openApiPath = path.join(__dirname, '../../docs/api/v1/openapi.yaml');
    const fileContents = fs.readFileSync(openApiPath, 'utf8');
    const jsonSpec = yaml.load(fileContents);
    res.json(jsonSpec);
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to load OpenAPI specification'
    });
  }
});

// API v1 routes
// router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/users', UserRoutes);

// reandom number genratre
router.get('/random-number', (req: Request, res: Response) => {
  const randomNumber = Math.floor(Math.random() * 100);
  res.json({ randomNumber });
});

// make funny match type some api genrate
router.get('/funny-match', (req: Request, res: Response) => {
  const matchType = Math.random() < 0.5 ? 'single' : 'double';
  res.json({ matchType });
})
// make 10 endpoint difference 
router.get('/difference', (req: Request, res: Response) => {
  const difference = Math.floor(Math.random() * 10);
  res.json({ difference });
});
router.get('/addition', (req: Request, res: Response) => {
  const addition = Math.floor(Math.random() * 10);
  res.json({ addition });

})
router.get('/subtraction', (req: Request, res: Response) => {
  const subtraction = Math.floor(Math.random() * 10);
  res.json({ subtraction });
});
router.get('/multiplication', (req: Request, res: Response) => {
  const multiplication = Math.floor(Math.random() * 10);
  res.json({ multiplication });
});
router.get('/division', (req: Request, res: Response) => {
  const division = Math.floor(Math.random() * 10);
  res.json({ division });
})


export default router;
