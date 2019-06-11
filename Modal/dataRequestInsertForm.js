import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form'
import PropTypes from 'prop-types';
import Utils from '../_shared/_utils';
import renderField from '../CommonComponents/RenderField';
import renderSelect from '../CommonComponents/renderSelect';
import RenderFile from '../CommonComponents/RenderFile';
import RenderCheckbox from '../CommonComponents/RenderCheckbox';
import RenderTagInput from './inputTags';

class DataRequestInsert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormStep: 'step1',
            isFormstep3: false,
            fileData: [],
            insertMsg: '',
            errMsg: '',
            disableBtn: true,
            formName: 'pdf',
            tagData: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createReqForm = this.createReqForm.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onTagSelect = this.onTagSelect.bind(this);
    }
    static propTypes = {
        history: PropTypes.object.isRequired,
        input: PropTypes.object,
        handleSubmit: PropTypes.func,
        pristine: PropTypes.bool,
        submitting: PropTypes.bool,
        closeInsertModal: PropTypes.func,
    };

    createReqForm(step) {
        let formType = 'pdf';
        if (step === 'step1') {
            formType = 'pdf';          
        } else if (step === 'step2') {
            formType = 'reconciliation';            
        } else if (step === 'step3') {
            formType = 'location_code';          
        }
        this.setState({
            isFormStep: step,
            formName: formType,
            fileData: [],
            fileUploadOne: '',
            fileUploadTwo: '',
            fileUploadThree: '',
        });      
    }

    onFileChange(name, file, filter) {

        if ( file === 'disable' ) {

            this.setState( {
                disableBtn: true,
                fileData: [],
            } )

        } else {

            if (filter === 'pdf' ) {

                if (name === 'file_1') {
                    this.setState({
                        fileData: [
                            file,
                        ],
                        disableBtn: false,
                    })
                }
                
            } else {
                
                if (name === 'file_1') {
                    this.setState({
                        fileUploadOne: '',
                    });
                    this.setState({
                        fileUploadOne: file,
                        disableBtn: false,
                    });
                }
                if (name === 'file_2') {
                    this.setState({
                        fileUploadTwo: '',
                    });
                    this.setState({
                        fileUploadTwo: file,
                        disableBtn: false,
                    });
                }
                if (name === 'file_3') {
                    this.setState({
                        fileUploadThree: '',
                    });
                    this.setState({
                        fileUploadThree: file,
                        disableBtn: false,
                    });
                }
                
            }

        }
        
    }

    onTagSelect(inputValues) {
        this.setState({
            tagData: [ ...this.state.tagData, inputValues ],
        })
    }

    handleSubmit(values) {
        
        let tagDataArray = [];
        tagDataArray.push(this.state.fileUploadOne);
        tagDataArray.push(this.state.fileUploadTwo);
        tagDataArray.push(this.state.fileUploadThree);

        let data = new FormData();
        data.append('login_user_name', Utils.getLocalStorage('fullname'))
        data.append('login_ldapid', Utils.getLocalStorage('ldapid'))
        data.append('req_name', values.req_name)
        if (values.req_source_type) {
            data.append('req_source_type', values.req_source_type)
        }
        if (values.req_type) {
            data.append('req_type', values.req_type)
        }       
        
        //data.append('req_tags', values.req_tag)
        data.append('form_name', this.state.formName)
        if (this.state.tagData && this.state.tagData.length > 0) {
            data.append('req_tags', this.state.tagData)
        }

        let file = [ 0, 1, 2 ];
        if (this.state.fileData && this.state.fileData.length > 0) {
            this.state.fileData.map(function (item, i) {
                console.log('item_if', item);
                data.append(file[i], item)
            })
        } else {
            tagDataArray.map(function (item, i) {
                console.log('item_else', item);
                data.append(file[i], item)
            })
        }

        this.setState({
            fileData: [],
        });
        //let insertValues = reqBody;
        fetch(`${Utils.getApiBaseUrl()}/newrequest`, {
            //Utils.getPostOptions( insertValues ),
            method: 'POST',
            body: data,       
        }
        ).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.isSuccess) {
                //console.log('data', data);
                this.setState({ insertMsg: 'New Request has been submitted' });
                setTimeout(this.props.closeInsertModal(), 500);
                this.props.history.push('/my-request')           
            } else {
                this.setState({ insertMsg: 'Upload Error. Please Try Again' });
            }
        });
    }

    render() {
        const { handleSubmit, pristine, submitting } = this.props;
        const { isFormStep, insertMsg, tags, suggestions, disableBtn, tagData } = this.state;

        return (
            <form method="post" onSubmit={handleSubmit(this.handleSubmit)} encType="multipart/form-data">
                <div className="formnav">
                    <button className={isFormStep === 'step1' ? 'md-button next-step' : 'md-button next-step inactive'} type="button" onClick={() => this.createReqForm('step1')}> PDF UPLOAD </button>
                    {/*<button className={isFormStep === 'step2' ? 'md-button next-step' : 'md-button next-step inactive'} type="button" onClick={() => this.createReqForm('step2')}> Reconciliation </button>
                    <button className={isFormStep === 'step3' ? 'md-button next-step' : 'md-button next-step inactive'} type="button" onClick={() => this.createReqForm('step3')}> Location Code </button>*/}
                </div>
                <div className="sub_req">
                    <div className="request_id">
                        <div className="requestor_info">
                            <label>Name<span>*</span></label>
                            <Field
                                name="req_name"
                                type="text"
                                component={renderField}
                                aria-required="true"
                            />
                        </div>
                        {isFormStep !== 'step1' ?
                            <div className="requestor_period">
                                <label>Source <span>*</span></label>
                                <Field name="req_source_type" component={renderSelect} type="select">
                                    <option value="Oracle">Oracle </option>
                                    <option value="HFM">HFM </option>
                                    <option value="PLX">PLX </option>
                                    <option value="GCore">GCore </option>
                                    <option value="file">File Upload </option>
                                </Field>
                            </div>
                            : ''}
                        {isFormStep !== 'step1' ?
                            <div className="requestor_period">
                                <label>Data Type <span>*</span></label>
                                <div>
                                    <Field name="req_type" label="" options={[ 'Others', 'Trial Balance', 'General Ledger', 'Fixed Asset' ]} component={RenderCheckbox} />
                                </div>
                            </div>
                            : ''}

                        {isFormStep === 'step1' ?
                            <div className="requestor_upload js">
                                <span className="fupload">File Upload*</span>
                                <Field
                                    name="file_1"
                                    component={RenderFile}
                                    type="file"
                                    className="inputfile inputfile-6"
                                    onFileChange={this.onFileChange}
                                    filter="pdf"
                                />
                            </div>
                            : ''}

                        {isFormStep === 'step1' ?
                            <div className="requestor_info">
                                <label>Tags <span>*</span></label>
                                
                                <Field
                                    name="pdf_tag"
                                    type="text"
                                    component={RenderTagInput}
                                    aria-required="true"
                                    className="tagsInput"
                                    onTagSelect={this.onTagSelect}
                                />
                            </div>
                            : ''}

                        {isFormStep === 'step3' ?
                            <div className="requestor_upload js">
                                <span className="fupload">File Upload*</span>
                                <Field name="file_1" component={RenderFile} type="file" className="inputfile inputfile-6" onFileChange={this.onFileChange} />
                            </div>
                            : ''}
                        {isFormStep === 'step2' ?
                            <div className="requestor_upload js">
                                <span className="fupload">File Upload*</span>
                                <Field name="file_1" component={RenderFile} type="file" className="inputfile inputfile-6" onFileChange={this.onFileChange} />
                            </div>
                            : ''}
                        {isFormStep === 'step2' ?
                            <div className="requestor_upload js">
                                <span className="fupload">File Upload*</span>
                                <Field name="file_2" component={RenderFile} type="file" className="inputfile inputfile-6" onFileChange={this.onFileChange} />
                            </div>
                            : ''}
                        {isFormStep === 'step2' ?
                            <div className="requestor_upload js">
                                <span className="fupload">File Upload*</span>
                                <Field name="file_3" component={RenderFile} type="file" className="inputfile inputfile-6" onFileChange={this.onFileChange} />
                            </div>
                            : ''}
                        <button
                            className="md-primary md-raised md-accent md-button"
                            type="submit"
                            disabled={pristine | submitting | disableBtn}>
                            Submit
                    </button>
                        {insertMsg ? <div className="formMsg"> {insertMsg}</div> : ''}

                    </div>
                </div>
            </form>
        );
    }
}

const afterSubmit = (result, dispatch) =>
    dispatch(reset('DataRequestInsert'));

export default reduxForm({
    form: 'DataRequestInsert', //a unique identifier for this form
    onSubmitSuccess: afterSubmit,
})(DataRequestInsert);