const express = require('express');
const router = express.Router();

const controller = require('../controllers/AppController');
const AuthController = require('../controllers/AuthController');
const FilesController = require('../controllers/FilesController');
// routes

router.get('/status', controller.getStatus);

router.get('/stats', controller.getStats);

router.post('/users', UserController.postNew);

router.get('/connect', AuthController.getConnect);

router.get('/disconnect', AuthController.getDisonnect);

router.get('/users/me', UserController.getMe);

router.post('/files', FilesController.postUpload);