const expect = require('chai').expect;
const getBeszallitoMW = require('../../../../middleware/beszallito/getBeszallitoMW');

describe('getBeszallitoMW middleware', function () {

    it('visszatér egy beszállítóval', function (done){
        const mw = getBeszallitoMW({
            BeszallitoModel: {
                findOne: (p1,cb) => {
                    expect(p1).to.be.eql({_id: '1'});
                    cb(null, 'mockbeszallito');
                }
            }

        });

        const resMock={
            locals: {}
        }

        mw({
                params: {
                    beszallitoid: '1'
                }
            },resMock,
            ()=>{
                expect(resMock.locals).to.be.eql({beszallito: 'mockbeszallito'});
                done();
            });
    });
    it('visszatér hibával', function (done){
        const mw = getBeszallitoMW({
            BeszallitoModel: {
                findOne: (p1,cb) => {
                    expect(p1).to.be.eql({_id: '1'});
                    cb('hibaaa', 'mockbeszallito');
                }
            }

        });

        const resMock={
            locals: {}
        }

        mw({
                params: {
                    beszallitoid: '1'
                }
            },resMock,
            (err)=>{
                expect(err).to.be.eql('hibaaa');
                done();
            });
    });
    it('next hívás, ha nincsen beszállító az adatbázisban', function (done){
        const mw = getBeszallitoMW({
            BeszallitoModel: {
                findOne: (p1,cb) => {
                    expect(p1).to.be.eql({_id: '1'});
                    cb(undefined, null);
                }
            }

        });

        const resMock={
            locals: {}
        }

        mw({
                params: {
                    beszallitoid: '1'
                }
            },resMock,
            (err)=>{
                expect(err).to.be.eql(undefined);
                expect(resMock.locals).to.be.eql({});
                done();
            });
    });
});