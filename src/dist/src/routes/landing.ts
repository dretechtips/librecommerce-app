import * as express from "express";
const router: express.Router = express.Router();

router.get(['/', '/home']);
router.get('/about');
router.get('/shop');
router.get('/contact');

export default router;