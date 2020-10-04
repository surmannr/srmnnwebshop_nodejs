var expect = require('chai').expect;
var getTermekMW = require('../../../../middleware/termek/getTermekMW');

describe('getTermekMW middleware', function () {

    it('visszatér egy termékkel', function (done){
       const mw = getTermekMW({
           TermekModel: {
                findOne: (p1,cb) => {
                    expect(p1).to.be.eql({_id: '1'});
                    cb(null, 'mocktermek');
                }
           }

        });

       const resMock={
           locals: {}
       }

       mw({
           params: {
               termekid: '1'
           }
       },resMock,
           ()=>{
            expect(resMock.locals).to.be.eql({termek: 'mocktermek'});
            done();
       });
    });
    it('visszatér hibával', function (done){
        const mw = getTermekMW({
            TermekModel: {
                findOne: (p1,cb) => {
                    expect(p1).to.be.eql({_id: '1'});
                    cb('hibaaa', 'mocktermek');
                }
            }

        });

        const resMock={
            locals: {}
        }

        mw({
                params: {
                    termekid: '1'
                }
            },resMock,
            (err)=>{
                expect(err).to.be.eql('hibaaa');
                done();
            });
    });
    it('next hívás, ha nincsen termék az adatbázisban', function (done){
        const mw = getTermekMW({
            TermekModel: {
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
                    termekid: '1'
                }
            },resMock,
            (err)=>{
                expect(err).to.be.eql(undefined);
                expect(resMock.locals).to.be.eql({});
                done();
            });
    });
});