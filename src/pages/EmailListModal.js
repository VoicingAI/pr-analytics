import Markdown from 'react-markdown'

const EmailListModal = ({ modalIsOpen, setModalIsOpen, data }) => {

    return (
        <div>

            <div className="modal" style={{ display: modalIsOpen ? "block" : 'hidden' }}>
                <div className="modal-content">
                    <div onClick={() => setModalIsOpen(false)} className="close">&times;</div>
                    <h5 style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Generated Email</h5>
                    <Markdown>{data}</Markdown>
                    <button className='btn btn-primary ' style={{ cursor: 'pointer' }} onClick={() => navigator?.clipboard?.writeText(data)}>Copy</button>
                </div>
            </div>
        </div>
    )
}

export default EmailListModal