let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../../app')
let Item = require('@api/item/itemModel')

let ENDPOINT = '/api/v1/item'

chai.use(chaiHttp)
chai.should()

describe('Item', () => {
    it('should list ALL item on /item GET', done => {
        chai.request(server)
            .get(ENDPOINT)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.json
                res.body.should.be.a('array')
                done()
            })
    })
    it('should list a SINGLE item on /item/<id> GET', done => {
        let newItem = new Item({
            name: 'Sakidi',
            desc: 'Tukang Gaban',
        })
        newItem.save((err, data) => {
            chai.request(server)
                .get(ENDPOINT + '/' + data.id)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.be.json
                    res.body.should.be.a('object')
                    done()
                })
        })
    })
    it('should add a SINGLE item on /item POST', done => {
        chai.request(server)
            .post(ENDPOINT)
            .send({ name: 'Alfonso', desc: 'Tigerhearts' })
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.json
                res.body.should.be.a('object')
                res.body.should.have.property('SUCCESS')
                res.body.SUCCESS.should.be.a('object')
                res.body.SUCCESS.should.have.property('name')
                res.body.SUCCESS.should.have.property('desc')
                res.body.SUCCESS.should.have.property('_id')
                res.body.SUCCESS.name.should.equal('Alfonso')
                res.body.SUCCESS.desc.should.equal('Tigerhearts')
                done()
            })
    })
    it('should update a SINGLE item on /item/<id> PUT', done => {
        chai.request(server)
            .get(ENDPOINT)
            .end((err, res) => {
                chai.request(server)
                    .put(ENDPOINT + '/' + res.body[0]._id)
                    .send({ name: 'Alfonso' })
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.should.be.json
                        res.body.should.be.a('object')
                        res.body.should.have.property('UPDATED')
                        res.body.UPDATED.should.be.a('object')
                        res.body.UPDATED.should.have.property('name')
                        res.body.UPDATED.should.have.property('_id')
                        res.body.UPDATED.name.should.equal('Alfonso')
                        done()
                    })
            })
    })
    it('should delete a SINGLE item on /item/<id> DELETE', () => {
        chai.request(server)
            .get(ENDPOINT)
            .end((err, res) => {
                chai.request(server)
                    .delete(ENDPOINT + res.body[0]._id)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.should.be.json
                        res.body.should.be.a('object')
                        res.body.should.have.property('REMOVED')
                        res.body.REMOVED.should.be.a('object')
                        res.body.REMOVED.should.have.property('name')
                        res.body.REMOVED.should.have.property('_id')
                        res.body.REMOVED.should.have.equal('Alfonso')
                        done()
                    })
            })
    })
})
