let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../../app')
let Item = require('@api/item/itemModel')

let ITEM_ENDPONT = '/api/v1/item'

chai.use(chaiHttp)
chai.should()

describe('Item', () => {
    it('should list ALL item on /item GET', (done) => {
        chai.request(server)
        .get(ITEM_ENDPONT)
        .end((err,res) => {
            res.should.have.status(200)
            res.should.be.json
            res.body.should.be.a('array')
            done()
        })
    })
    it('should list a SINGLE item on /item/<id> GET', (done) => {
        let newItem = new Item({
            name: 'Sakidi',
            desc: 'Tukang Gaban',
        })
        newItem.save((err,data) => {
            chai.request(server)
            .get(ITEM_ENDPONT+'/'+data.id)
            .end((err,res) => {
                res.should.have.status(200)
                res.should.be.json
                res.body.should.be.a('object')
                done()
            })
        })
    })
    it('should add a SINGLE item on /item POST')
    it('should update a SINGLE item on /item/<id> PUT')
    it('should delete a SINGLE item on /item/<id> DELETE')
})


