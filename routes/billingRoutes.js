const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  //requireLogin middleware  runs when a call to /api/stripe is invoked
    app.post('/api/stripe', requireLogin, async (req, res) => {
      const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5 for 5 credits',
        source: req.body.id
      });

    //update the user model with added credit  
    req.user.credits += 5;
    //persist
    const user = await req.user.save();
    //return user
    res.send(user);
    })
}