import { Router, Request, Response, NextFunction } from 'express';
import { MainClass } from '../main-class';
import { PassportStatic } from 'passport';
import { User } from '../model/User';
import { HeartRate } from '../model/HeartRate';
import { BloodPressure } from '../model/BloodPressure';
import { Weight } from '../model/Weight';
import { BloodSugar } from '../model/BloodSugar';


export const configureRoutes = (passport: PassportStatic, router: Router): Router => {

    router.get('/', (req: Request, res: Response) => {
        let myClass = new MainClass();
        res.status(200).send('Hello, World!');
    });

    router.get('/callback', (req: Request, res: Response) => {
        let myClass = new MainClass();
        myClass.monitoringCallback((error, result) => {
            if (error) {
                res.write(error);
                res.status(400).end();
            } else {
                res.write(result);
                res.status(200).end();
            }
        });
    });

    router.get('/promise', async (req: Request, res: Response) => {
        let myClass = new MainClass();
        /* myClass.monitoringPromise().then((data: string) => {
            res.write(data);
            res.status(200).end();
        }).catch((error: string) => {
            res.write(error);
            res.status(400).end();
        }); */


        // async-await
        try {
            const data = await myClass.monitoringPromise();
            res.write(data);
            res.status(200).end();
        } catch (error) {
            res.write(error);
            res.status(400).end();
        }
    });


    router.get('/observable', (req: Request, res: Response) => {
        let myClass = new MainClass();
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.setHeader('Transfer-Encoding', 'chunked');

        // deprecated variant
        /* myClass.monitoringObservable().subscribe((data) => {
            console.log(data);
        }, (error) => {
            console.log(error);
        }, () => {
            console.log('complete');
        }); */

        myClass.monitoringObservable().subscribe({
            next(data: string) {
                res.write(data);
            }, error(error: string) {
                res.status(400).end(error);
            }, complete() {
                res.status(200).end();
            }
        });
    });

    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: typeof User) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                if (!user) {
                    res.status(400).send('User not found.');
                } else {
                    req.login(user, (err: string | null) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        } else {
                            const query = User.findOne({
                                _id: user
                            });
                            query.then(data => {
                                res.status(200).send(data);
                            }).catch(error => {
                                console.log(error);
                                res.status(500).send('Internal server error.');
                            })
                        }
                    });
                }
            }
        })(req, res, next);
    });

    router.post('/register', (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const tel = req.body.tel;
        const role = req.body.role;
        const user = new User({email: email, password: password, name: name, tel: tel, role: role});
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    router.post('/logout', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getAllUsers', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = User.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getDoctors', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = User.find({
                role: "doctor"
            });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getPatients', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = User.find({
                doctor: req.user
            });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getUserData', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = User.findOne({
                _id: req.user
            });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getDoctor', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const currentUserQuery = User.findOne({
                _id: req.user
            });
            currentUserQuery.then(data => {
                const query = User.findOne({
                    _id: data?.doctor
                });
                query.then(data => {
                    res.status(200).send(data);
                }).catch(error => {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                })
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getHeartRates', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            console.log('params: ', req.query);
            const query = HeartRate.find({
                userId: req.user
            }).sort({'time': 'desc'});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getBloodPressures', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            console.log('params: ', req.query);
            const query = BloodPressure.find({
                userId: req.user
            }).sort({'time': 'desc'});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getBloodSugars', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            console.log('params: ', req.query);
            const query = BloodSugar.find({
                userId: req.user
            }).sort({'time': 'desc'});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getWeights', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            console.log('params: ', req.query);
            const query = Weight.find({
                userId: req.user
            }).sort({'time': 'desc'});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/recordHeartRate', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const now = new Date();
            const heartRateNum = Number(req.query.heartRate);
            const heartRate = new HeartRate({time: now, userId: req.user, heartRate: heartRateNum});
            heartRate.save().then(data => {
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/recordBloodPressure', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const now = new Date();
            const bloodPressureString = req.query.bloodPressure;
            const bloodPressure = new BloodPressure({time: now, userId: req.user, bloodPressure: bloodPressureString});
            bloodPressure.save().then(data => {
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/recordBloodSugar', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const now = new Date();
            const bloodSugarString = req.query.bloodSugar;
            const bloodSugar = new BloodSugar({time: now, userId: req.user, bloodSugar: bloodSugarString});
            bloodSugar.save().then(data => {
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/recordWeight', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const now = new Date();
            const weightString = req.query.weight;
            const weight = new Weight({time: now, userId: req.user, weight: weightString});
            weight.save().then(data => {
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/setDoctor', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = User.findOne({
                _id: req.user
            });
            query.then(data => {
                if (data) {
                    data.doctor = req.query.doctor as string;
                    data.save().then(data => {
                        res.status(200).send(data);
                    }).catch(error => {
                        res.status(500).send(error);
                    })
                }
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/checkAuth', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            res.status(200).send(true);
        } else {
            res.status(500).send(false);
        }
    });

    router.get('/getUser', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            res.json(req.user);      
        } else {
            res.status(401).json({ message: 'Not authenticated' });
        }
    });

    router.get('/getUserById', async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user data', error });
        }
    });

    router.delete('/deleteUser', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = User.deleteOne({_id: id});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    return router;
}