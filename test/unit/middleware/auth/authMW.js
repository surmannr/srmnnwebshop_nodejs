var expect = require('chai').expect;
var authMW = require('../../../../middleware/auth/authMW');

describe('authMW middleware', function () {

    it('ha nincs belépve, akkor a bejelentkeztető felületre írányít', function (done){
        const mw = authMW({
        });

        mw({
                session: {
                    belepve: false
                }
            },{
                redirect: where => {
                    expect(where).to.be.equal('/');
                    done();
                }
            },
            ()=>{
                done();
            });
    });
    it('ha be van lépve, akkor a tovább enged', function (done){
        const mw = authMW({});

        mw({
                session: {
                    belepve: true
                }
            },{
                redirect: where => {
                    expect(where).to.be.equal('/');
                    done();
                }
            },
            ()=>{
                done();
            });
    });
});