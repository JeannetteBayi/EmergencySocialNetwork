//import Emergency from './public/images/Emergency.png';
/***the main routes of the ens application***/
/*** the routes file uses express router ****/
/** routes.js - Wiki route module.***/
/**
 * Author : D.Bernard, Micheal, Gilbert, Jeannette, J.Ibare
 */

const thisApp = require('./app.js');
var express = require('express');
var app = express();
app.use(express.json());
app.set('view engine', 'ejs');
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
var router = express.Router();
const http = require('http');
const session = require('express-session');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
const urlencoded = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();
var data = {};
const JoinCommunityController = require('./controllers/JoinCommunity');
const InforSearchingController = require('./controllers/InforSearchingController')
const ChatController = require('./controllers/ChatController')
const EmergencyGroup = require('./controllers/emergencygroup.js');
const emergencyController = require('./controllers/escalateEmergencyKeywordController')
const ShareStatus = require('./controllers/ShareStatusController.js');
const DonationController = require('./controllers/DonationController.js');



var ERController
var ERModel

/** This is the default route of the app*/
var user;
router.get('/', function(req, res) {
    user = req.session;
    user.username;
    user.password;
    if (!user.username) {
        res.render('pages/landing');
    }
});

/* posting a message, either public or private @param {*} author  @param {*} target @param {*} content @returns JSON  with 200 code status in case data have been successfully saved* @return JSON with 400 code if there has been a problem in accessing or reading from the db*/
router.post('/messages/', jsonParser, function(req, res) {
    ChatController.postMessage(req.body.author, req.body.target, req.body.content, (err, result) => {
        if (err) {
            res.status(400)

        } else {
            res.status(200).json(res);
        }
    });
});

/*** This is the get route for searchin information* This is API end point*/
router.get('/search/announcements', function(req, res) {
            InforSearchingController.getSearchesInAnnouncements(req.query, function(err, result) {
            if (err) {
                res.status(404)
            } else {
                res.status(200).json(result)

            }

        })

    })


/*** This is the get route for searchin information* This is API end point*/
router.get('/search/citizens', function(req, res) {
    InforSearchingController.getUsersByCriteria(req.query, function(err, result) {

        if (err) {
            res.status(404);
        } else {
            res.status(200).json(result)

        }

    })

});


/*** This is the get route for searchin information* This is API end point*/
router.get('/search/publicMessages', function(req, res) {
    user = req.session;
    InforSearchingController.getSearchesInPublicMessages( req.query, function(err, result) {
        if (err) {
            res.status(404);
        } else {
            res.status(200).json(result)

        }

    })

});


/*** This is the get route for searchin information* This is API end point*/
router.get('/search/privateMessages', function(req, res) {
    user = req.session;
    InforSearchingController.getSearchesInPrivateMessages(req.query, function(err, result) {
        if (err) {
            console.log('Failure to search for:' + searchParams.context)
            res.status(404);
        } else {
            console.log('Forwarded from  controller', result)
            res.status(200).json(result)
        }

    })

});


/** * This is the get route users * This is an API end point */
router.get('/users', function(req, res) {
    JoinCommunityController.getUserSortedList(function(err, docs) {
        if (err) {
            res.status(404);
        } else {
            res.json(docs);
        }
    });

});

/*** This is the post  route users This is an API end point*/
router.post('/users', jsonParser, function(req, res) {
    user = req.session;
    if (req.body.choice == "join") {
        user.username = req.body.username;
        user.password = req.body.password;
    }
    JoinCommunityController.userLogin(user.username, user.password, req.body.choice, function(logs) {
        user.username = req.body.username;
        user.password = req.body.password;
        res.json(logs);
    });

});

/**users/username/statuscode  This is the post  route user share status This is an API end point*/
router.post('/users/username/statuscode', jsonParser, function(req, res) {
    user = req.session;
    ShareStatus.updateUserStatusCode(req.body.username, req.body.status, req.body.reason, function(err, feedback) {
        if (err) {
            res.status(400);

        } else {
            res.status(200);
        }
    });

});

/*** This is the post  route users * This is an API end point*/

router.get('/users/username/logout', jsonParser, function(req, res) {
    user = req.session;
    JoinCommunityController.updateOnlineStatusForLogout(user.username, function(err, numAffected) {
        if (err) {
            res.json(numAffected.ok);

        } else {
            req.session.destroy(function(err) {
            });
            res.json(data);
        }

    });

});


/* registering an emergency @param {*} req @param {*} res @returns JSON  with 200 code status in case data have been successfully saved* @return JSON with 400 code if there has been a problem in accessing or reading from the db*/
router.post('/emergencies/', jsonParser, function(req, res) {
    DonationController.saveEmergency(req.body.title, req.body.name, req.body.quantity, req.body.description, (err, result) => {
        if (err) {
            res.status(400)
        } else {
            res.status(200).json(result);
        }
    });
});


/* getting the list of all pending emergencies that people can donate too @param {*} req @param {*} res @returns JSON  with 200 code status in case data have been successfully saved @return JSON with 400 code if there has been a problem in accessing or reading from the db*/
router.get('/emergencies/', jsonParser, function(req, res) {
    DonationController.getEmergencies((err, result) => {
        if (err) {
            res.status(400)
        } else {
            res.status(200).json(result);
        }
    });
});

/*getting details of an emergency given its Id@param {*} req @param {*} res @returns JSON  with 200 code status data has been successfully retreived from database @return JSON with 400 code if there has been a problem in accessing or reading from the db*/
router.get('/emergencyDetails/', function(req, res) {
    DonationController.getEmergencyById(req.query.id, (err, result) => {
        if (err) {
            res.status(400).json(2);

        } else {
            res.status(200).json(result);
        }
    });
});


/*donating to emergency given the emergency id and the amount of money to donate @param {*} req @param {*} res @returns JSON  with 200 code status code for successfull donation * @return JSON with 400 code for unsuccessfull donation */
router.post('/Donation', jsonParser, function(req, res) {
    DonationController.donateToEmergency(req.body.id, req.body.money, function(err, feedback) {
        if (err) {
            res.status(400);
        } else {
            res.status(200).json(feedback);
        }
    });

});


/*API routes gor messages*/
router.get('/messages', function(req, res, err) {
    ChatController.getLatestMessagesAndStatusCode(req.query.author, req.query.target, function(err, messages) {
        if (err) {
            res.status(400)
        } else {
            res.status(200).json(messages)
        }
    });
});


/* * Save and Broadcast the announcement*/
router.post('/announcements', jsonParser, function(req, res) {
    ChatController.postAnnouncement( req.body.author,  req.body.title, req.body.content, function(err, annoucementJSON) {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json('OK');
        }
    })
    var data = JSON.stringify(req.body);
});


/* Get the 10 latest  announcements from the db @param {*} callback  @returns a JSON containing the the 10 latests announcements otherwise, @returns error occured during the operation*/
router.get('/announcements', function(req, res) {

    ChatController.getLatestAnnouncements(function(err, announcementsJSON) {
        if (err) {
            res.status(404)
        } else {
            announcementsJSON['announcementData'].forEach(element => {});
            res.json(announcementsJSON)
        }
    })
});


/***JSON API call for adding friends details The route add new  friend ship details  online*/
router.get('/friends', function(req, res) {
    user = req.session;
    EmergencyGroup.GetFriendReport(req.query.username, function(err, result) {

        if (err) {
            res.json(404)
        } else {
            res.json(result)
        }
    });

});

/*** JSON API call for adding friends details The route add new  friend ship details online*/
router.get('/statuscrumb', function(req, res) {
    user = req.session;
    EmergencyGroup.getListAllStatuscrumb(function(err, result) {

        if (err) {
            res.json(404)
        } else {
            res.json(result)
        }
    });

});
/*** JSON API call for adding friends details The route add new  friend ship details online*/

router.post('/friends', jsonParser, function(req, res) {
    user = req.session;
    if (req.body.status == "pending friend") {
        EmergencyGroup.addNewGroupFriend(req.body, function(err, result) {
            if (err) {
                res.json(404);
            } else {
                res.json(200);
            }
        });

    } else {
        EmergencyGroup.updateFriendGroupStatus(req.body, function(err, numAffected) {
            if (err) {
                res.json(404);
            } else {
                if (numAffected == 1) {
                    res.json(200);
                } else {
                    res.json(201);
                }

            }

        });

    }

});


/***JSON API call The route online*/
router.post('/groups', jsonParser, function(req, res) {
    user = req.session;
    EmergencyGroup.createNewGroup(req.body.username, function(err, result) {
        if (err) {
            res.json(404);
        } else {
            res.json(200);
        }

    });
});



/*** Get the recent ER*/
router.get('/emergencyRooms/', jsonParser, async function(req, res) {
    
    ERController = req.app.get('EmergencyRoomController')
    ERModel = req.app.get('EmergencyRoomModel')

    ERController.getERMetadata(ERModel, function(error, result) {
        if (error) {
            res.status(404)
        } else {
            res.json(result)
        }
    })
})


router.post('/emergencyRooms/', jsonParser, function(req, res) {

    ERController = req.app.get('EmergencyRoomController')
    ERModel = req.app.get('EmergencyRoomModel')

    if (req.body) {
        
        ERController.saveER(ERModel, req.body, function(error, result) {
            if (error) {
                res.status(404)
            } else {
                res.json(200)
            }
        })
    }

})

router.delete('/emergencyRooms/:id', function(req, res) {

    ERController = req.app.get('EmergencyRoomController')
    ERModel = req.app.get('EmergencyRoomModel')

    if (req.params.id) {
        var id = JSON.parse(req.params.id);
        ERController.removeER(ERModel, id, function(error, result) {
            if (error) {
                res.status(404)
            } else {
                res.json(200)
            }
        })
    }
})

/*This route calls the API for escalate messages */

router.get('/hitwordmessages/', jsonParser, function(req, res) {
    emergencyController.getLatestHitMessages(function(err, messages) {
        if (err) {
            res.status(400)
        } else {
            res.status(200).json(messages)
        }

    });
});

router.get('/announcementspage', function(req, res) {res.render('pages/announcements');});
router.get('/join', function(req, res) {res.render('pages/join');});
router.get('/confirmation', function(req, res) {res.render('pages/confirmation');});
router.get('/home', function(req, res) {res.render('pages/home');});
router.get('/thanks', function(req, res) {res.render('pages/ThankDonanors');});
router.get('/success', function(req, res) {res.render('pages/ThankRegistors');});
router.get('/sharestatus', function(req, res) {res.render('pages/sharestatus');});
router.get('/statistics', function(req, res) {res.render('pages/statistics');});
router.get('/coordinations', function(req, res) {res.render('pages/emergency');});
router.get('/Donations', function(req, res) {res.render('pages/donation');});
router.get('/userdirectory', function(req, res) {res.render('pages/users');});
router.get('/searchinfopage', function(req, res) {res.render('pages/searchinfo');});
router.get('/chatprivately', function(req, res) {res.render('pages/chatprivately');});
router.get('/chatpublicly/', function(req, res) {res.render('pages/chatpublicly');});
router.post('/users/status/statuscode', function(req, res) {var data = JSON.stringify(req.body);res.json(req.body); });
router.get('/friendspage', function(req, res) {  res.render('pages/friends');});
router.get('/grouppage', function(req, res) {res.render('pages/groups');});
router.get('/groupfriendemergencymessagepage', function(req, res) {res.render('pages/groupemergencymessage');});
router.get('/groupnotificationspage', function(req, res) {res.render('pages/groupnotifications');});
router.get('/invitingfriendpage', function(req, res) {res.render('pages/userlist');});
router.get('/emergencygroupterms', function(req, res) { res.render('pages/setupgroup');});
router.get('/groupmessagepage', function(req, res) {res.render('pages/groupmessages');});
router.get('/userlocationpage', function(req, res) {res.render('pages/map');});
router.get('/groupchatpage', function(req, res) {res.render('pages/groupchat');});
router.get('/groups', jsonParser, function(req, res) { user = req.session;res.json(req.body); });
router.get('/shower', function(req, res) {res.render('pages/shower');});


module.exports = router
