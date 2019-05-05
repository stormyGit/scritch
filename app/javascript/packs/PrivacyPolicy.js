import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  tableRoot: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  paperQuote: {
    padding: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  link: {
    cursor: "pointer",
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  table: {
    minWidth: 700
  },
  sectionPadder: {
    marginTop: "-56px",
    paddingTop: "56px",
    display: "block"
  }
});

const Spacer = <div style={{ padding: 8 }} />;
const SpacerWithHR = (
  <React.Fragment>
    {Spacer}
    <hr />
    {Spacer}
  </React.Fragment>
);

class TermsOfUse extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h2" id="website-user-guide1">
          Scritch Privacy Policy
        </Typography>
        <Typography variant="subtitle1">
          Date of last revision: <strong>01 May 2019</strong>
        </Typography>
        {SpacerWithHR}
        <Typography variant="h4" id="contents">
          CONTENTS
        </Typography>
        <Typography variant="subtitle1">
          <a href="#forward" className={classes.link}>
            1. FORWARD
          </a>
          <br />
          <a href="#collection" className={classes.link}>
            2. COLLECTION OF INFORMATION
          </a>
          <br />
          {"> 2.1 Information You Provide to Us"}
          <br />
          {
            "> 2.2 Information We Collect Automatically When You Use the Services"
          }
          <br />
          {"> 2.3 Image Recognition Technology"}
          <br />
          {"> 2.4 Cookies"}
          <br />
          {"> 2.5 Use of Information"}
          <br />
          {"> 2.6 Sharing of Information"}
          <br />
          {"> 2.7 Social Sharing Features and Third-Party Integrations"}
          <br />
          {"> 2.8 Security"}
          <br />
          {"> 2.9 Data Retention"}
          <br />
          {"> 2.10 Data Transfers"}
          <br />
          <a href="#account_info" className={classes.link}>
            3. ACCOUNT INFORMATION
          </a>
          <br />
          <a href="#privacy" className={classes.link}>
            4. PRIVACY AND PERMISSIONS SETTINGS
          </a>
          <br />
          <a href="#deletion" className={classes.link}>
            5. DELETING PHOTOS
          </a>
          <br />
          <a href="#sharing" className={classes.link}>
            6. PHOTO SHARING FEATURES
          </a>
          <br />
          <a href="#exif" className={classes.link}>
            7. EXIF INFORMATION
          </a>
          <br />
          <a href="#cookies" className={classes.link}>
            8. COOKIES
          </a>
          <br />
          <a href="#legal" className={classes.link}>
            9. LEGAL BASIS FOR PROCESSING
          </a>
          <br />
          <a href="#data_subjects_requests" className={classes.link}>
            10. DATA SUBJECT REQUESTS
          </a>
          <br />
          <a href="#questions" className={classes.link}>
            11. QUESTIONS OR COMPLAINTS
          </a>
          <br />
          <a href="#contact" className={classes.link}>
            12. CONTACT US
          </a>
          <br />
        </Typography>
        {SpacerWithHR}
        <span id="forward" className={classes.sectionPadder} />
        <Typography variant="h4">1. FORWARD</Typography>
        <Typography variant="subtitle1">
          SCRITCH USERS: Scritch is owned and operated by Scritch Limited. This
          Privacy Policy will apply to information collected through your use of
          the Services.
          <br />
          <br />
          Scritch Limited and its subsidiaries, including Scritch. (“Scritch
          Limited”, “we”, “our”, or “us”), are committed to the privacy of our
          customers. This Privacy Policy (“Privacy Policy”) explains how
          information about you is collected, used and disclosed by Scritch
          Limited. This Privacy Policy applies to information we collect when
          you use the Scritch services, including the Scritch mobile application
          (when the application is available for download by users via
          authorised application stores and other platforms) and Scritch website
          (collectively, the “Services”). We may change this Privacy Policy from
          time to time. If we make changes, we will notify you by revising the
          date at the top of the policy and, in some cases, we may post a notice
          on the Site (or associated channels). We encourage you to review the
          Privacy Policy whenever you access the Services to stay informed about
          our information practices and the choices available to you.
          <br />
          <br />
          The section headings and subheadings contained in this agreement are
          included for convenience only, and shall not limit or otherwise affect
          the terms of the Privacy Policy. Any construction or interpretation to
          be made of this document shall not be construed against the drafter.
          This policy constitutes the entire agreement between Scritch Limited
          and you with respect to the subject matter hereof.
        </Typography>
        {SpacerWithHR}
        <span id="collection" className={classes.sectionPadder} />
        <Typography variant="h4">2. COLLECTION OF INFORMATION</Typography>
        {Spacer}
        <Typography variant="h5">2.1 Information You Provide to Us</Typography>
        <Typography variant="subtitle1">
          We collect information you provide directly to us. For example, we
          collect information when you:
          <br />
          <br />
          Create an account;
          <br />
          Purchase products or services;
          <br />
          Participate in a survey, contest or sweepstakes;
          <br />
          Contact us for any reason, such as to request help with the Services
          or to provide us with your comments/feedback, or;
          <br />
          Post information in connection with media.
          <br />
          <br />
          The types of information we may collect include your name, email
          address, ZIP code, credit card information and other information you
          choose to provide.
        </Typography>
        {Spacer}
        <Typography variant="h5">
          2.2 Information We Collect Automatically When You Use the Services
        </Typography>
        <Typography variant="subtitle1">
          When you access or use our Services, we automatically collect
          information about your use of the Services, including:
          <br />
          <br />
          <strong>Log Information</strong>: We log information about your use of
          the Services, including the type of browser you use, access times,
          pages viewed, your IP address and the page you visited before
          navigating to our Services.
          <br />
          <br />
          <strong>Device Information</strong>: We collect information about the
          computer or mobile device you use to access our Services, including
          the hardware model, operating system and version, screen resolution,
          color and depth, device identifiers and mobile network information.
          <br />
          <br />
          <strong>EXIF Data</strong>: Exchangeable Image File Format (“EXIF”)
          data is a record of the settings and other relevant metadata inserted
          by a digital camera when you take a photo or video such as camera
          type, aperture, shutter speed, focal length, and location, among other
          information. Unless you turn off EXIF data on your camera or device or
          remove it from the picture before uploading to Scritch, Scritch
          receives and stores EXIF data.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.3 Image Recognition Technology</Typography>
        <Typography variant="subtitle1">
          We may use image recognition algorithms to find visually similar
          images as well as to help you organize your photos and make it easier
          to search images. This technology might assist tagging in future
          development of the website.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.4 Cookies</Typography>
        <Typography variant="subtitle1">
          We use various technologies to collect information, including cookies
          and similar technologies. Cookies are small data files stored on your
          hard drive or in device memory that help us to improve our Services
          and your experience, see which areas and features of our Services are
          popular and count visits. We use cookies to keep you logged in to the
          Services.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.5 Use of Information</Typography>
        <Typography variant="subtitle1">
          We may use information we collect to provide and improve our Services,
          to deliver the products and services you order, to facilitate
          contests, and to communicate with you. We also use the information we
          collect to understand how users interact with our services and to
          personalise our Services.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.6 Sharing of Information</Typography>
        <Typography variant="subtitle1">
          We may share information about you as follows or as otherwise
          described in this Privacy Policy:
          <br />
          With vendors, consultants and other service providers who need access
          to such information to carry out work on our behalf;
          <br />
          <br />
          In response to a request for information if we believe disclosure is
          in accordance with any applicable law, regulation or legal process, or
          as otherwise required by any applicable law, rule or regulation;
          <br />
          If we believe your actions are inconsistent with the spirit or
          language of our user agreements or policies, or to protect the rights,
          property and safety of Scritch Limited or others;
          <br />
          In connection with, or during negotiations of, any merger, sale of
          company assets, financing or acquisition of all or a portion of our
          business to another company; and
          <br />
          With your consent or at your direction, including if we notify you
          through our Services that the information you provide will be shared
          in a particular manner and you provide such information.
          <br />
          We may also share aggregated information that does not directly
          identify you.
        </Typography>
        {Spacer}
        <Typography variant="h5">
          2.7 Social Sharing Features and Third-Party Integrations
        </Typography>
        <Typography variant="subtitle1">
          The Services may offer social sharing features and other integrated
          tools which let you share actions you take on our Services with other
          media, and vice versa. The use of such features enables the sharing of
          information with your friends or the public, depending on the settings
          you establish with the entity that provides the social sharing
          feature. For more information about the purpose and scope of data
          collection and processing in connection with social sharing features,
          please visit the privacy policies of the entities that provide these
          features.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.8 Security</Typography>
        <Typography variant="subtitle1">
          Scritch takes reasonable measures to help protect information about
          you from loss, theft, misuse and unauthorised access, disclosure,
          alteration and destruction.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.9 Data Retention</Typography>
        <Typography variant="subtitle1">
          We store the information we collect about you for as long as is
          necessary for the purpose(s) for which we originally collected it. We
          may retain certain information for legitimate business purposes or as
          required by law.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.10 Data Transfers </Typography>
        <Typography variant="subtitle1">
          To provide the Services, the website is hosted by OVH where all data
          is transferred, stored, and recovered from.
        </Typography>
        {SpacerWithHR}
        <span id="account_info" className={classes.sectionPadder} />
        <Typography variant="h4">3. ACCOUNT INFORMATION</Typography>
        <Typography variant="subtitle1">
          You may update, correct or delete information about you at any time by
          logging into your online account or emailing us at{" "}
          <a href="mailto:contact@scritch.es" className={classes.link}>
            contact@scritch.es
          </a>
          . You may delete your account pursuant to{" "}
          <a href="/terms_of_use" target="_blank" className={classes.link}>
            Scritch’s Terms of Use
          </a>
          , but note that we may retain certain information as required by law
          or for legitimate business purposes.
        </Typography>
        {SpacerWithHR}
        <span id="privacy" className={classes.sectionPadder} />
        <Typography variant="h4">
          4. PRIVACY AND PERMISSIONS SETTINGS
        </Typography>
        <Typography variant="subtitle1">
          You can control who is able to see your profile, through the Block
          feature Service. Unblocking of Users is through the “Settings and
          Security” Dialog of you Profile Menu. If you choose to use your real
          name (or include any identifying information as part of your “screen
          name”) that information will be publicly displayed through the
          Services. Therefore, please use caution in determining how you wish to
          be identified in using the Services.
        </Typography>
        {SpacerWithHR}
        <span id="deletion" className={classes.sectionPadder} />
        <Typography variant="h4">5. DELETING PHOTOS</Typography>
        <Typography variant="subtitle1">
          You can delete individual media that you have on Scritch by selecting
          the User Content that you wish to delete, then clicking the delete
          button in the Edit Media Dialog.
        </Typography>
        {SpacerWithHR}
        <span id="sharing" className={classes.sectionPadder} />
        <Typography variant="h4">6. PHOTO SHARING FEATURES</Typography>
        <Typography variant="subtitle1">
          Your media will be public by default. To remove public visibility of a
          media, delete as detailed in Section 5.
        </Typography>
        {SpacerWithHR}
        <span id="exif" className={classes.sectionPadder} />
        <Typography variant="h4">7. EXIF INFORMATION</Typography>
        <Typography variant="subtitle1">
          By default, Scritch will display a Dialog showing EXIF data about the
          media you upload. The link shows on all your individual User Content
          pages, and displays a limited amount of the EXIF data, including the
          date and time, as well as make & model and configuration of the camera
          used to capture the media.
        </Typography>
        {SpacerWithHR}
        <span id="cookies" className={classes.sectionPadder} />
        <Typography variant="h4">8. COOKIES</Typography>
        <Typography variant="subtitle1">
          Most web browsers are set to accept cookies by default. If you prefer,
          you can usually choose to set your browser to remove or reject browser
          cookies. Please note that if you choose to remove or reject cookies,
          this could affect the availability and functionality of our Services.
        </Typography>
        {SpacerWithHR}
        <span id="legal" className={classes.sectionPadder} />
        <Typography variant="h4">9. LEGAL BASIS FOR PROCESSING</Typography>
        <Typography variant="subtitle1">
          If you are a resident of the EEA, when we process your personal data
          we will only do so in the following situations:
          <br />
          <br />
          We need to use your personal information to perform our
          responsibilities under our contract with you (e.g., processing
          payments for and providing the Services you have requested);
          <br />
          We have a legitimate interest in processing your personal data. For
          example, we may communicate with you about changes to our Services,
          and to provide, secure, and improve our Services.
        </Typography>
        {SpacerWithHR}
        <span id="data_subjects_requests" className={classes.sectionPadder} />
        <Typography variant="h4">10. DATA SUBJECT REQUESTS</Typography>
        <Typography variant="subtitle1">
          If you are a resident of the EEA, you have the right to access
          personal information we hold about you and to ask that your personal
          information be corrected, erased, or transferred. You may also have
          the right to object to, or request that we restrict, certain
          processing. If you would like to exercise any of these rights, you may
          contact us as indicated below.
        </Typography>
        {SpacerWithHR}
        <span id="questions" className={classes.sectionPadder} />
        <Typography variant="h4">11. QUESTIONS OR COMPLAINTS</Typography>
        <Typography variant="subtitle1">
          If you are a resident of the EEA and have a concern about our
          processing of personal information that we are not able to resolve,
          you have the right to lodge a complaint with the data privacy
          authority where you reside.
        </Typography>
        {SpacerWithHR}
        <span id="contact" className={classes.sectionPadder} />
        <Typography variant="h4">12. CONTACT US</Typography>
        <Typography variant="subtitle1">
          If you have any comments or concerns about this Privacy Policy or
          would like to contact us for any reason, you may reach us via email at{" "}
          <a href="mailto:contact@scritch.es" className={classes.link}>
            contact@scritch.es
          </a>
          .
        </Typography>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(TermsOfUse);
