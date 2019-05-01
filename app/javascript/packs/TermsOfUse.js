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
          Scritch Terms & Conditions of Use (“Terms of Use”)
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
          <a href="#general_terms" className={classes.link}>
            2. GENERAL TERMS
          </a>
          <br />
          {"> 2.1 Additional Policies"}
          <br />
          {"> 2.2 Scritch Community Guidelines"}
          <br />
          {"> 2.3 Copyright Policy"}
          <br />
          {"> 2.4 Mobile Applications"}
          <br />
          {"> 2.5 License"}
          <br />
          {"> 2.6 Marks"}
          <br />
          {"> 2.7 Restrictions"}
          <br />
          {"> 2.8 HyperLinks"}
          <br />
          {"> 2.9 User Content"}
          <br />
          {"> 2.10 Acceptable Use; Disclaimer"}
          <br />
          {"> 2.11 Your Account"}
          <br />
          {"> 2.12 Account Security"}
          <br />
          {"> 2.13 Third Party Services"}
          <br />
          {"> 2.14 Advertisements and Promotions"}
          <br />
          {"> 2.15 DISCLAIMER OF WARRANTIES"}
          <br />
          {"> 2.16 LIMITATION OF LIABILITY"}
          <br />
          {"> 2.17 Indemnity"}
          <br />
          {"> 2.18 Dispute Resolution"}
          <br />
          {"- > 2.18.1 Applicable Law"}
          <br />
          {
            "- > 2.18.2 Agreement to Arbitrate & Waiver of Representative Actions"
          }
          <br />
          {"> 2.19 Feedback"}
          <br />
          {"> 2.20 Assignment"}
          <br />
          {"> 2.21 International Users"}
          <br />
          {"> 2.22 Severability"}
          <br />
          {"> 2.23 Survival"}
          <br />
          {"> 2.24 Questions or Comments"}
          <br />
          <a href="#additional_terms" className={classes.link}>
            3. ADDITIONAL TERMS APPLICABLE TO SCRITCH SPONSOR SERVICES (“SPONSOR
            TERMS”)
          </a>
          <br />
          {"> 3.1 Sponsorships"}
          <br />
          {"> 3.2 Free Trials"}
          <br />
          {"> 3.3 Sponsorship Plans"}
          <br />
          {"> 3.4 Term and Automatic Renewal"}
          <br />
          {
            "> 3.5 Interruptions or Discontinuation of Scritch Sponsor Services; Changes to Scritch Sponsor Services and Terms of Use"
          }
          <br />
          {"> 3.6 Service Access on Expiry of Sponsorship Term"}
          <br />
          {"> 3.7 Termination of Services"}
          <br />
          <a href="#copyright" className={classes.link}>
            4. COPYRIGHT POLICY
          </a>
          <br />
          {"> 4.1 EUCD Notice of Alleged Infringement (“Notice”)"}
        </Typography>
        {SpacerWithHR}
        <span id="forward" className={classes.sectionPadder} />
        <Typography variant="h4">1. FORWARD</Typography>
        <Typography variant="subtitle1">
          SCRITCH USERS: Scritch is owned and operated by Scritch Limited
          (collectively, “we”). Your continued use of the website services will
          be subject to these Terms of Use. These Terms of Use also apply to
          your use of current and planned Services, where applicable, to other
          related merchandise, products and services (“Products”) through
          Scritch’s approved third party vendors and retailers (“Scritch
          Vendors”). For information about how Scritch collects, uses and
          discloses your information, please see the Privacy Policy. Below are
          Scritch’s terms and conditions of use (“Terms of Use”) that apply to
          the Scritch services included currently in the Scritch website (the
          “Site”) and the future Scritch mobile application (collectively, the
          “Services”). The Services are owned and operated by Scritch Limited.
          <br />
          <br />
          PLEASE READ THESE TERMS OF USE CAREFULLY. BY ACCESSING OR USING THE
          SERVICE, YOU AGREE TO BE BOUND BY THESE TERMS OF USE.
          <br />
          <br />
          Welcome to Scritch! The Services provide our users with online tools
          designed to facilitate and share our love of fursuit media to foster
          closeness in the furry community. These Terms of Use protect the legal
          interests of Scritch Limited, our users, and any future third party
          vendors.
          <br />
          <br />
          Your use of the Services and your purchase of Products is expressly
          conditioned upon your agreement to these Terms of Use. If you do not
          consent to these Terms of Use, you are not permitted to use any
          Services. If you access the Services on behalf of a company or other
          entity, you warrant that you are an authorised representative of such
          company or entity with the right to bind such company or entity to
          these Terms of Use.
          <br />
          <br />
          These Terms of Use contain provisions that govern how claims that you
          and Scritch Limited have against each other are resolved (see{" "}
          <a href="#dispute_resolution" className={classes.link}>
            Dispute Resolution Section
          </a>
          ). These Terms of Use also contain provisions requiring you to resolve
          certain disputes or claims relating to your use of the Services by
          binding arbitration, rather than in court. If you do not consent to
          such terms, you are not permitted to use the Services.
          <br />
          <br />
          Scritch Limited reserves the right to change, modify, revise or
          otherwise amend any provision of these Terms of Use, and any other
          terms, policies or guidelines governing your use of the Services, at
          any time at its sole discretion by providing notice that the Terms of
          Use have been modified. Such notice may be provided by sending an
          email, or by posting a notice on the Site (or associated channels), or
          by posting the revised Terms of Use on the Site and revising the date
          at the top of these Terms of Use or by such other form of notice as
          determined by Scritch Limited. Your continued use of the Services, or
          your purchase of any Products or the Services following the posting of
          the revised Terms of Use or other notice will constitute your
          acceptance of such changes or modifications. Otherwise, any changes or
          modifications will be effective within thirty (30) days of the posting
          of the revisions on the Site unless you notify Scritch Limited within
          such thirty (30) days that you do not agree to the changes and stop
          using the Services. Therefore, you should review these Terms of Use
          whenever you access the Services and at least every thirty (30) days
          to make sure that you understand the terms and conditions that will
          apply to your use of the Services.
          <br />
          <br />
          Our{" "}
          <a href="/privacy_policy" target="_blank" className={classes.link}>
            Privacy Policy
          </a>{" "}
          provides information on how Scritch collects, uses and discloses
          information from all users of the Services and/or information obtained
          through your purchase of Products through the Services.
        </Typography>
        {SpacerWithHR}
        <span id="general_terms" className={classes.sectionPadder} />
        <Typography variant="h4">2. GENERAL TERMS</Typography>
        {Spacer}
        <Typography variant="h5">2.1 Additional Policies</Typography>
        <Typography variant="subtitle1">
          These Terms of Use and the following additional Scritch terms and
          policies (as applicable) together constitute a binding agreement
          between you and Scritch Limited. All such additional policies are
          incorporated into these Terms of Use as applicable and collectively
          govern your use of the Services and/or purchase of Products.
          <br />
          <br />
          The section headings and subheadings contained in this agreement are
          included for convenience only, and shall not limit or otherwise affect
          the terms of the Terms of Use. Any construction or interpretation to
          be made of the Terms of Use shall not be construed against the
          drafter. The Terms of Use constitute the entire agreement between
          Scritch Limited and you with respect to the subject matter hereof.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.2 Scritch Community Guidelines</Typography>
        <Typography variant="subtitle1">
          When you use Scritch, you are subject to the Scritch Community
          Guidelines found in the{" "}
          <a href="/user_guide" target="_blank" className={classes.link}>
            Website User Guide
          </a>
          .
        </Typography>
        {Spacer}
        <Typography variant="h5">2.3 Copyright Policy</Typography>
        <Typography variant="subtitle1">
          Scritch Limited respects the intellectual property rights of others
          and expects its users to do the same. To that end, all Scritch users
          are subject to the{" "}
          <a href="#copyright" className={classes.link}>
            COPYRIGHT POLICY
          </a>{" "}
          below.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.4 Mobile Applications</Typography>
        <Typography variant="subtitle1">
          If you access and use the Services via the Scritch mobile application
          (when the application is available for download by users via
          authorised application stores and other platforms), or on a mobile
          phone, tablet or similar mobile device, you are bound by these Terms
          of Use.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.5 License</Typography>
        <Typography variant="subtitle1">
          The Services and all images, software, platforms, tools, graphics,
          data, text, code, the Marks (as defined below) and other content and
          materials available on the Services (excluding User Content) and the
          selection and arrangement thereof (collectively, the “Scritch
          Materials”) are the property of Scritch Limited or its third party
          licensors and are protected by United Kingdom and international
          intellectual property laws.
          <br />
          <br />
          Scritch Limited hereby grants you a limited, non-transferable,
          non-sublicensable, revocable license to access and use the Scritch
          Materials solely in accordance with these Terms of Use. Except for the
          limited licenses granted hereunder, Scritch Limited reserves all
          rights not expressly granted and no such additional rights may be
          implied. You acknowledge that:
          <br />
          <br />
          all right, title and interest in and to the Scritch Materials,
          including all patents, copyrights, trade secrets, trademarks and other
          proprietary rights embodied therein or associated therewith, are and
          will remain with Scritch Limited or its third party licensors; no
          right or interest in the Scritch Materials is conveyed other than the
          limited licenses granted herein; the Scritch Materials are protected
          by copyright and other intellectual property laws; and; Scritch
          Limited asserts that the Scritch Materials embody valuable
          confidential and secret information of Scritch Limited or its
          licensors, the development of which required the expenditure of time
          and money.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.6 Marks</Typography>
        <Typography variant="subtitle1">
          You acknowledge that “Scritch Limited”, the Scritch Limited logo,
          “Scritch”, the Scritch logo, its mascot Pixel, the look and feel of
          the Services, and any other Product or Service names, logos or slogans
          of either Scritch Limited or Scritch contained in the Services are
          trademarks of Scritch Limited (collectively, the “Marks”) and may not
          be copied, imitated or used without the prior written permission of
          Scritch Limited. All other trademarks, registered trademarks, product
          names and company names or logos mentioned in the Services are the
          property of their respective owners.
          <br />
          <br />
          Scritch Limited may provide users with tools to download the Marks via
          the Services. If you download or otherwise obtain the Marks using such
          tools, Scritch Limited grants you a limited right to:
          <br />
          <br />
          use the Marks for the sole purpose of referencing the Services and; to
          use only those Marks that are made available to you by Scritch Limited
          through such tools.
          <br />
          <br />
          Your use of any Marks must be consistent with the size, dimensions,
          color and other characteristics of the Marks and consistent with any
          other policies concerning the Marks that we may post on the Site or
          otherwise make available through the Services from time to time. You
          may not:
          <br />
          <br />
          alter or change the appearance of the Marks;
          <br />
          use the Marks in any manner that suggests Scritch Limited sponsors or
          endorses a product, service, promotion, contest, or;
          <br />
          use the Marks for any other purpose deemed by Scritch Limited to be
          inappropriate. Scritch Limited has the right to revoke your right to
          use the Marks at any time at our sole discretion.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.7 Restrictions</Typography>
        <Typography variant="subtitle1">
          You agree that you will not:
          <br />
          <br />
          modify or alter the Scritch Materials;
          <br />
          create derivative works of the Scritch Materials;
          <br />
          decompile, disassemble, decode or reverse engineer the Scritch
          Materials, translate the Scritch Materials or otherwise attempt to
          learn the source code, structure, algorithms or internal ideas
          underlying the Scritch Materials or reduce the Scritch Materials by
          any other means to a human-perceivable form; or;
          <br />
          bypass, delete or disable any copy protection mechanisms or any
          security mechanisms in the Scritch Materials.
          <br />
          <br />
          Except as otherwise expressly permitted herein, you may not use the
          Services or the Scritch Materials to engage in any of the following
          prohibited activities:
          <br />
          <br />
          the collection, copying or distribution of any portion of the Scritch
          Materials;
          <br />
          any resale, commercial use, commercial exploitation, distribution,
          public performance or public display of the Services or the Scritch
          Materials;
          <br />
          modifying or otherwise making any derivative uses of the Services or
          the Scritch Materials;
          <br />
          scraping or otherwise using any data mining, robots or similar data
          gathering or extraction methods on or in connection with the Services;
          <br />
          with the exception of User Content made available by users for
          download, the downloading of any portion of the Scritch Materials or
          any information contained therein, or;
          <br />
          any use of the Services or the Scritch Materials other than for their
          intended purposes.
          <br />
          <br />
          Any use of the Services or of any Scritch Materials other than as
          specifically authorised herein, without the express prior written
          permission of Scritch Limited, the applicable Scritch user or the
          Content Owner, is strictly prohibited. Any such unauthorised use will
          result in the immediate termination of your rights under these Terms
          of Use and will constitute a breach of the license granted herein.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.8 HyperLinks</Typography>
        <Typography variant="subtitle1">
          You may create a text hyperlink to the Site, provided such link does
          not portray Scritch or Scritch Limited or any of its Products or
          Services in a false, misleading, derogatory or otherwise defamatory
          manner. This limited right may be revoked by Scritch Limited at any
          time. You may not frame the Site or utilise framing techniques to
          enclose the Site, Scritch Materials, Scritch Marks or other
          proprietary information without Scritch Limited’s express prior
          written consent.
          <br />
          <br />
          As a part of the Services, Scritch may provide you with access to and
          use of certain personalised pages and corresponding web addresses
          (“URLs”) that you may customise. Scritch Limited does not guarantee
          the availability of any particular web page or URL and reserves the
          right, at any time and at our sole discretion, to reclaim, suspend,
          terminate and/or transfer any such web page or URL.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.9 User Content</Typography>
        <Typography variant="subtitle1">
          The Services may enable you to upload media to the Site or other
          portions of the Services (collectively, the “User Content”).
          <br />
          <br />
          You retain all held intellectual property rights in and to any User
          Content you post, upload or otherwise make available through the
          Services, including the copyright in and to your media. Scritch
          Limited does not claim any ownership, right, title or interest in and
          to your User Content.
          <br />
          <br />
          Notwithstanding the foregoing, by uploading and/or posting any User
          Content to the Services, you grant Scritch Limited a perpetual,
          non-exclusive and royalty-free right to use the User Content (and the
          user name that is submitted in connection with such User Content) as
          is reasonably necessary in order to enable Scritch Limited to provide
          the Services, including to display the User Content on the Services.
          <br />
          <br />
          You represent and warrant that:
          <br />
          <br />
          you own or otherwise control all of the rights to the User Content
          that you post or transmit, or you otherwise have the right to post,
          use, display, distribute and reproduce such User Content and to grant
          the rights granted herein;
          <br />
          the User Content you supply is accurate and not misleading; and;
          <br />
          the use and posting of the User Content you supply does not violate
          these Terms of Use and will not violate any rights of or cause injury
          to any person or entity.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.10 Acceptable Use; Disclaimer</Typography>
        <Typography variant="subtitle1">
          You are solely responsible for the User Content that you post or
          transmit using the Services and you agree not to post, transmit or
          otherwise publish through the Services any of the following:
          <br />
          <br />
          User Content that is unlawful, defamatory, hateful, harassing,
          threatening, invasive of privacy or publicity rights, abusive,
          inflammatory, fraudulent or otherwise objectionable or harmful;
          <br />
          User Content that is obscene, pornographic, indecent, lewd, sexually
          suggestive, including without limitation photos, videos or other User
          Content containing nudity;
          <br />
          User Content that would constitute, encourage or provide instructions
          for a criminal offense, violate the rights of any party, endanger
          national security, or that would otherwise create liability or violate
          any local, state, national or international law;
          <br />
          User Content that may infringe or violate any patent, trademark, trade
          secret, copyright or other intellectual or other proprietary right of
          any party; User Content that impersonates any person or entity or
          otherwise misrepresents your affiliation with a person or entity;
          <br />
          unsolicited messages containing promotions, political campaigning,
          advertising or solicitations;
          <br />
          private information of any third party, including, without limitation:
          addresses, phone numbers, email addresses, social security numbers and
          credit card numbers;
          <br />
          viruses, corrupted data or other harmful, disruptive or destructive
          files, and;
          <br />
          User Content that, in the sole judgment of Scritch, is objectionable,
          harmful or which restricts or inhibits any other person from using or
          enjoying the Services, or which may expose Scritch or its users to any
          harm or liability of any nature;
          <br />
          User Content that is not in line with the current Upload Guidelines
          found in the{" "}
          <a href="/user_guide" target="_blank" className={classes.link}>
            Website User Guide
          </a>
          .
          <br />
          <br />
          Although certain activities in these Terms of Use are prohibited,
          Scritch Limited does not make any representation or warranty that the
          User Content you may encounter through your use of the Services
          complies with these acceptable use provisions or the Terms of Use.
          YOUR USE OF THE SERVICES IS SOLELY AT YOUR OWN RISK. These Terms of
          Use do not create any private right of action on the part of any third
          party or any reasonable expectation that the Services will not contain
          any content that is prohibited by these acceptable use provisions.
          Scritch Limited reserves the right (but is not obligated) to:
          <br />
          <br />
          review or screen any User Content submitted to the Site or otherwise
          submitted through the Services;
          <br />
          edit any User Content posted on the Services; and/or;
          <br />
          remove any User Content from the Services for any reason, at any time,
          without prior notice, at our sole discretion.
          <br />
          <br />
          Scritch Limited will have no liability or responsibility to users of
          the Services or any other person or entity for performance or
          nonperformance of such activities. Scritch Limited’s enforcement of
          the acceptable use provisions set forth in these Terms of Use with
          respect to User Content in some instances does not constitute a waiver
          of our right to enforce such provisions in other instances involving
          similar User Content.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.11 Your Account</Typography>
        <Typography variant="subtitle1">
          Certain activities on the Services require you to register and create
          an account. By creating an account, you represent and warrant that
          your Login Credentials provided are complete and accurate. Scritch
          Limited reserves the right to refuse access to the Services to anyone
          at any time, with or without cause at its sole discretion. You agree
          to keep your account information current and complete, as Scritch
          Limited may send important notices about your account from time to
          time. By creating an account, you consent to receive communications
          from Scritch Limited about the Services by system messages consistent
          with the terms of our{" "}
          <a href="/privacy_policy" target="_blank" className={classes.link}>
            Privacy Policy
          </a>
          .
        </Typography>
        {Spacer}
        <Typography variant="h5">2.12 Account Security</Typography>
        <Typography variant="subtitle1">
          You are solely responsible for maintaining the confidentiality of the
          passwords (if applicable) associated with your account and for
          restricting access to your passwords (if applicable) and physical
          access to your computer while logged into the Services. You accept
          responsibility for all activities that occur under your user account.
          <br />
          <br />
          User Content that you post, upload or otherwise make available via the
          Services may be accessed, used and downloaded by other users of the
          Services. You understand and acknowledge that any User Content
          contained in public areas of the Services, including any user
          galleries or other portions of the Services, is accessible to the
          public and could be accessed, downloaded, indexed, archived, linked to
          and republished by others including, without limitation, appearing on
          other websites and in search engine results.
          <br />
          <br />
          Scritch uses commercially reasonable security measures to protect user
          accounts and User Content consistent with their Account Settings. We
          cannot, however, guarantee absolute security of your account, your
          User Content or the Login Credentials we collect, and we cannot
          promise that our security measures will prevent third party “hackers”
          from illegally accessing the Services or their contents. Scritch is
          not responsible or liable for any third party access to or use of the
          User Content you post or your Login Credentials. You agree to
          immediately notify Scritch of any unauthorised use of your account,
          Login Credentials, or passwords (if applicable) or any other breach of
          security, and you accept all risks of unauthorised access to the Login
          Credentials, User Content and any other information you provide to
          Scritch.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.13 Third Party Services</Typography>
        <Typography variant="subtitle1">
          Scritch Limited may make third party content and services available on
          or through the Services (“Third Party Services”) solely as a
          convenience to its users (for example, links to third party websites,
          software and other services). When you leave the Services, you should
          be aware that these Terms of Use and all other Scritch Limited
          policies no longer govern your use of such websites and services or
          any content contained thereon.
          <br />
          <br />
          Scritch Limited does not imply affiliation, approval, or control of
          any Third Party Services by making such Third Party Services available
          via the Services. Scritch Limited makes no claim or representation
          regarding, and accepts no responsibility for, the quality, accuracy,
          nature, ownership or reliability of Third Party Services. YOUR USE OF
          ANY SUCH THIRD PARTY SERVICES IS SOLELY AT YOUR OWN RISK AND SUBJECT
          TO THE APPLICABLE TERMS AND CONDITIONS AND PRIVACY POLICIES APPLICABLE
          TO SUCH THIRD PARTY SERVICES.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.14 Advertisements and Promotions</Typography>
        <Typography variant="subtitle1">
          The Services may contain third party advertisements and promotions
          generated or posted by other users of the Services, Scritch Vendors or
          other third party service providers.
          <br />
          <br />
          Your business dealings or interactions with any third parties,
          including other users of the Services or Scritch Vendors, and any
          terms, conditions, warranties or representations associated with such
          dealings, are solely between you and such third party. Scritch does
          not endorse, approve, or control any such products, services,
          advertising or promotions (outside of ensuring that they fall within
          content restrictions and advertisement requirements imposed by Scritch
          Limited) posted to the Services by its users or the Scritch Vendors.
          Scritch Limited is not responsible or liable for any loss or damage of
          any kind incurred as the result of your direct dealings with its users
          or a Scritch Vendor or otherwise resulting from the presence of
          advertisements for third party products and services included on the
          Services.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.15 DISCLAIMER OF WARRANTIES</Typography>
        <Typography variant="subtitle1">
          THE SITE, SERVICES, THE SCRITCH MATERIALS, AND THE PRODUCTS ARE
          PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS WITHOUT WARRANTIES OF
          ANY KIND, EXPRESS OR IMPLIED. TO THE FULL EXTENT PERMISSIBLE BY
          APPLICABLE LAW, SCRITCH LIMITED DISCLAIMS ALL WARRANTIES, EXPRESS OR
          IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND
          NON-INFRINGEMENT AS TO THE SITE, THE SERVICES, THE SCRITCH MATERIALS,
          AND THE PRODUCTS.
          <br />
          <br />
          SCRITCH LIMITED DOES NOT REPRESENT OR WARRANT THAT THE SCRITCH
          MATERIALS OR THE SERVICES ARE ACCURATE, COMPLETE, RELIABLE, CURRENT OR
          ERROR-FREE OR THAT THE SERVICES, ITS SERVERS OR MESSAGES SENT FROM
          SCRITCH OR THE SERVICES ARE FREE OF VIRUSES OR OTHER HARMFUL
          COMPONENTS. SCRITCH LIMITED IS NOT RESPONSIBLE FOR TYPOGRAPHICAL
          ERRORS OR OMISSIONS RELATING TO PRICING, TEXT, PHOTOS. SCRITCH LIMITED
          ALSO MAKES NO REPRESENTATION OR WARRANTY REGARDING THE AVAILABILITY,
          RELIABILITY OR SECURITY OF THE SERVICES AND WILL NOT BE LIABLE FOR ANY
          UNAUTHORISED ACCESS TO OR ANY MODIFICATION, SUSPENSION,
          UNAVAILABILITY, OR DISCONTINUANCE OF THE SERVICES OR THE PRODUCTS
          PROVIDED THEREON.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.16 LIMITATION OF LIABILITY</Typography>
        <Typography variant="subtitle1">
          IN NO EVENT WILL SCRITCH LIMITED OR ITS DIRECTORS, MEMBERS, EMPLOYEES
          OR AGENTS BE LIABLE FOR ANY SPECIAL, INDIRECT OR CONSEQUENTIAL
          DAMAGES, OR ANY OTHER DAMAGES OF ANY KIND, INCLUDING, BUT NOT LIMITED
          TO, LOSS OF USE, LOSS OF PROFITS OR LOSS OF DATA, WHETHER IN AN ACTION
          IN CONTRACT, TORT OR OTHERWISE, ARISING OUT OF OR IN ANY WAY CONNECTED
          WITH THE USE OF OR INABILITY TO USE OR VIEW THE SITE, THE SERVICES,
          THE PRODUCTS, THE USER CONTENT OR THE SCRITCH MATERIALS CONTAINED IN
          OR ACCESSED THROUGH THE SERVICES, INCLUDING ANY DAMAGES CAUSED BY OR
          RESULTING FROM YOUR RELIANCE ON ANY INFORMATION OBTAINED FROM SCRITCH,
          OR THAT RESULT FROM MISTAKES, OMISSIONS, INTERRUPTIONS, DELETION OF
          FILES OR EMAIL, ERRORS, DEFECTS, VIRUSES, DELAYS IN OPERATION OR
          TRANSMISSION OR ANY TERMINATION, SUSPENSION OR OTHER FAILURE OF
          PERFORMANCE, WHETHER OR NOT RESULTING FROM ACTS OF GOD, COMMUNICATIONS
          FAILURE, THEFT, DESTRUCTION OR UNAUTHORISED ACCESS TO SCRITCH’S
          RECORDS, PROGRAMS OR SERVICES.
          <br />
          <br />
          IN NO EVENT WILL THE AGGREGATE LIABILITY OF SCRITCH LIMITED, WHETHER
          IN CONTRACT, WARRANTY, TORT (INCLUDING NEGLIGENCE, WHETHER ACTIVE,
          PASSIVE OR IMPUTED), PRODUCT LIABILITY, STRICT LIABILITY OR OTHER
          THEORY, ARISING OUT OF OR RELATING TO THE USE OF OR INABILITY TO USE
          THE SITE, THE SERVICES, THE PRODUCTS, THE USER CONTENT OR THE SCRITCH
          MATERIALS, EXCEED COMPENSATION YOU PAY, IF ANY, TO SCRITCH LIMITED FOR
          ACCESS TO OR USE OF THE SITE OR THE SERVICES OR FOR THE PURCHASE OF
          PRODUCTS. CERTAIN LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES
          OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY
          TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS, EXCLUSIONS, OR
          LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MIGHT HAVE ADDITIONAL
          RIGHTS.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.17 Indemnity</Typography>
        <Typography variant="subtitle1">
          You agree to defend, indemnify and hold harmless Scritch Limited and
          its affiliates and subsidiaries (collectively, the “Indemnified
          Parties”), and the Indemnified Parties’ independent contractors,
          service providers and consultants, and their respective directors,
          employees and agents, from and against any claims, damages, costs,
          liabilities and expenses (including reasonable attorneys’ fees)
          arising out of or related to any User Content you post or otherwise
          transmit on or through the Services, your use of or inability to use
          the Services, the User Content, or the Scritch Materials or the
          Products, including any actual or threatened suit, demand or claim
          made against any of the Indemnified Parties and/or their independent
          contractors, service providers, employees, directors or consultants,
          arising out of or relating to your User Content, your conduct, your
          violation of these Terms of Use or your violation of the rights of any
          third party.
        </Typography>
        {Spacer}
        <span id="dispute_resolution" className={classes.sectionPadder} />
        <Typography variant="h5">2.18 Dispute Resolution</Typography>
        {Spacer}
        <Typography variant="h6">2.18.1 Applicable Law</Typography>
        <Typography variant="subtitle1">
          Your use of the Services is subject to all applicable local, national
          and international laws and regulations. These Terms of Use and your
          use of the Services will be governed by and construed in accordance
          with the laws of the United Kingdom to agreements made and to be
          entirely performed within the United Kingdom, without regard to its
          conflict of law provisions.
        </Typography>
        {Spacer}
        <Typography variant="h6">
          2.18.2 Agreement to Arbitrate & Waiver of Representative Actions
        </Typography>
        <Typography variant="subtitle1">
          PLEASE READ THE FOLLOWING PARAGRAPH CAREFULLY BECAUSE IT REQUIRES YOU
          TO ARBITRATE DISPUTES WITH SCRITCH LIMITED AND IT LIMITS THE MANNER IN
          WHICH YOU CAN SEEK RELIEF. IF YOU DO NOT CONSENT TO THE TERMS OF THIS
          SECTION, YOU ARE NOT PERMITTED TO USE THE SERVICES.
          <br />
          <br />
          You and Scritch Limited agree to arbitrate any dispute arising from
          these Terms of Use or relating to the Services, Site or Scritch
          Materials. ARBITRATION PREVENTS YOU FROM SUING IN COURT OR FROM HAVING
          A JURY TRIAL. You and Scritch Limited agree:
          <br />
          <br />
          to notify each other of any dispute within thirty (30) days of when it
          arises;
          <br />
          to attempt informal resolution prior to any demand for arbitration;
          <br />
          that any arbitration will occur in the United Kingdom; and;
          <br />
          that arbitration will be conducted confidentially by a single
          arbitrator in accordance with the Rules of the Advisory, Conciliation
          and Arbitration Service (“ACAS”), including the ACAS’s Supplementary
          Procedures for Consumer-Related Disputes (as applicable).
          <br />
          <br />
          The ACAS’s rules are available at www.acas.org.uk. Other than class
          procedures and remedies described in these Terms of Use, the
          arbitrator has the authority to grant any remedy that would otherwise
          be available in court. Notwithstanding the foregoing, you and Scritch
          Limited are NOT required to arbitrate any dispute in which either
          party seeks equitable or other relief for the alleged unlawful use of
          copyrights, trademarks, trade names, logos, trade secrets or patents.
          <br />
          <br />
          The arbitrator will not be bound by rulings in prior arbitrations
          involving different Scritch Limited or Scritch users but is bound by
          rulings in prior arbitrations involving the same Scritch Limited or
          Scritch user to the extent required by applicable law. The
          arbitrator’s award will be final and binding and judgment on the award
          rendered by the arbitrator may be entered in any court having
          jurisdiction thereof. YOU AND SCRITCH LIMITED AGREE THAT EACH MAY
          BRING CLAIMS AGAINST THE OTHER ONLY ON AN INDIVIDUAL BASIS AND NOT AS
          PART OF ANY PURPORTED CLASS OR REPRESENTATIVE ACTION OR PROCEEDING.
          UNLESS BOTH YOU AND SCRITCH LIMITED AGREE OTHERWISE, THE ARBITRATOR
          MAY NOT CONSOLIDATE OR JOIN MORE THAN ONE PERSON’S OR PARTY’S CLAIMS
          AND MAY NOT OTHERWISE PRESIDE OVER ANY FORM OF A CONSOLIDATED,
          REPRESENTATIVE, OR CLASS PROCEEDING. ALSO, THE ARBITRATOR MAY AWARD
          RELIEF (INCLUDING MONETARY, INJUNCTIVE, AND DECLARATORY RELIEF) ONLY
          IN FAVOR OF THE INDIVIDUAL PARTY SEEKING RELIEF AND ONLY TO THE EXTENT
          NECESSARY TO PROVIDE RELIEF NECESSITATED BY THAT PARTY’S INDIVIDUAL
          CLAIM(S). ANY RELIEF AWARDED CANNOT AFFECT OTHER SCRITCH LIMITED OR
          SCRITCH USERS.
          <br />
          <br />
          Unless you and Scritch Limited agree otherwise, in the event that a
          court decides that any part of this Section is invalid or
          unenforceable, you agree that any claim or dispute that has arisen or
          may arise between you and Scritch Limited must be resolved exclusively
          by a court located in the United Kingdom. The remainder of the Terms
          of Use will continue to apply. You and Scritch Limited agree to submit
          to the personal jurisdiction of the courts located within the United
          Kingdom for the purpose of litigating all such claims or disputes.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.19 Feedback</Typography>
        <Typography variant="subtitle1">
          We welcome feedback from our users regarding ideas and suggestions for
          improvements to the Site, Services and Products. Scritch Limited will
          be entitled to use any such feedback without restriction, even if you
          designate such feedback as confidential. You hereby grant Scritch
          Limited a royalty-free, sublicensable, transferable, perpetual,
          irrevocable license in and to any feedback to use in any matter
          related to the operation of our business.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.20 Assignment</Typography>
        <Typography variant="subtitle1">
          These Terms of Use are binding upon and inure to the benefit of the
          parties hereto and their permitted successors and assigns.
          Notwithstanding the foregoing, you may not assign your rights under
          these Terms of Use without Scritch Limited’s prior written consent.
          Scritch Limited will be permitted to assign its rights under these
          Terms of Use at its sole discretion.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.21 International Users</Typography>
        <Typography variant="subtitle1">
          Scritch Limited is located in the United Kingdom. If you access the
          Services from a country other than the United Kingdom, you agree that
          your transactions with Scritch Limited occur in the United Kingdom.
          You are responsible for compliance with all applicable laws, rules and
          regulations applicable to your use of the Services.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.22 Severability</Typography>
        <Typography variant="subtitle1">
          If any provision of these Terms of Use is held invalid or
          unenforceable by any court of competent jurisdiction, the other
          provisions of these Terms of Use will remain in full force and effect,
          and, if legally permitted, such offending provision will be replaced
          with an enforceable provision that as nearly as possible, effects the
          parties’ intent.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.23 Survival</Typography>
        <Typography variant="subtitle1">
          The terms and conditions of these Terms of Use which by their nature
          are intended to survive termination or expiration of Services
          (including, but not limited to, Indemnification, Warranty Disclaimer,
          Dispute Resolution and the Limitation of Liability) will survive any
          expiration or termination of these Terms of Use.
        </Typography>
        {Spacer}
        <Typography variant="h5">2.24 Questions or Comments</Typography>
        <Typography variant="subtitle1">
          Scritch is committed to keeping its users happy and satisfied with
          their use of the Services. If you have any questions, concerns,
          complaints or comments in any way related to your use of the Services,
          please contact us at{" "}
          <a href="mailto:contact@scritch.es" className={classes.link}>
            contact@scritch.es
          </a>
          . If you have any questions, concerns, complaints or comments in any
          way related to your use of the Services or the transfer of your
          Scritch account to Scritch Limited, please contact us at{" "}
          <a href="mailto:contact@scritch.es" className={classes.link}>
            contact@scritch.es
          </a>
          .
        </Typography>
        {SpacerWithHR}
        <span id="additional_terms" className={classes.sectionPadder} />
        <Typography variant="h4">
          3. ADDITIONAL TERMS APPLICABLE TO SCRITCH SPONSOR SERVICES (“SPONSOR
          TERMS”)
        </Typography>
        <Typography variant="subtitle1">
          You may use the Scritch Sponsor Services only in accordance with these
          Sponsor Terms (and the Terms of Use of which they are a part). In the
          event of any conflict between these Sponsor Terms and the other
          provisions of the Terms of Use, these Sponsor Terms will control.
        </Typography>
        {Spacer}
        <Typography variant="h5">3.1 Sponsorships</Typography>
        <Typography variant="subtitle1">
          The Scritch Sponsor Services are available to users:
          <br />
          who register for a free trial (when available) or for a subscription
          to the Scritch Sponsor Services (“Sponsorship”) and;
          <br />
          who pay in full the subscription fees (“Sponsorship Fees”) applicable
          to the level of Sponsorship selected by such user (the “Sponsorship
          Plan”).
          <br />
          <br />
          If you wish to sponsor the Site, you will be required to provide
          certain information in order to facilitate such purchase, including
          your credit card number, billing address and any related payment
          information as required by Scritch (collectively, “Payment
          Information”). Scritch may use a third party payment processor (e.g.
          Stripe) to facilitate your payment of any Sponsorship Fees. Any
          Payment Information that you provide will be governed by the terms of
          ourwith the terms of our{" "}
          <a href="/privacy_policy" target="_blank" className={classes.link}>
            Privacy Policy
          </a>
          . By submitting Payment Information via the Services, you warrant that
          you have the legal right to use any such credit card or other payment
          mechanism that you provide to facilitate the transaction.
        </Typography>
        {Spacer}
        <Typography variant="h5">3.2 Free Trials</Typography>
        <Typography variant="subtitle1">
          When you first register for the Sponsorship, Scritch may offer you the
          ability to use the Scritch Sponsor Services without charge for a
          limited trial period (a “Free Trial”). The duration of a Free Trial
          will be the number of days specified by Scritch at the time of your
          registration for such Free Trial. You do not need to provide Scritch
          (or our applicable third party payment processor) with valid Payment
          Information and select a Sponsorship Plan in order to register for a
          Free Trial. At the conclusion of your Free Trial, you will revert to
          the free-to-access Scritch Services on which point you will be able to
          take up a Sponsorship Plan by providing Scritch (or our applicable
          third party payment processor) with valid Payment Information. Scritch
          may offer you the ability to register for a Sponsorship directly
          without the need to participate in a Free Trial.
        </Typography>
        {Spacer}
        <Typography variant="h5">3.3 Sponsorship Plans</Typography>
        <Typography variant="subtitle1">
          Scritch offers a variety of Sponsorship Plans. A description of each
          Sponsorship Plan that is currently offered by Scritch is available at{" "}
          <a
            href="https://scritch.es/sponsors/new"
            className={classes.link}
            target="_blank"
          >
            scritch.es/sponsors
          </a>
          . By purchasing a Sponsorship:
          <br />
          <br />
          you agree to pay all applicable Sponsorship Fees and other charges in
          accordance with your selected Sponsorship Plan, pursuant to the
          renewal and termination provisions described below (including any
          applicable taxes, such as sales tax), and;
          <br />
          you agree that you are only entitled to the features and services
          applicable to the Sponsorship Plan that you select at the time you
          purchase a Sponsorship.
          <br />
          <br />
          A Sponsorship is intended to be used by Scritch users for the ability
          to access Scritch Sponsor Services as permitted under the user’s
          applicable Sponsorship Plan. Scritch, at its sole discretion, reserves
          the right to limit, suspend or terminate your use of the Sponsorship
          if Scritch determines that you have violated these Sponsor Terms or
          the Terms of Use.
          <br />
          <br />
          Each Sponsorship is personal to the individual Scritch user. You may
          not transfer or assign your Sponsorship to another individual, entity
          or Scritch user unless such transfer or assignment is expressly
          permitted by the terms of your Sponsorship Plan.
          <br />
          <br />
          From time to time, Scritch may provide certain users with
          complimentary Sponsorships. Any user accessing the Services by using a
          free Sponsorship is bound by the Terms of Use and any applicable terms
          and conditions of these Scritch Sponsor Services Terms “Sponsor Terms”
          (including Scritch’s right to terminate or cancel such Sponsorships).
        </Typography>
        {Spacer}
        <Typography variant="h5">3.4 Term and Automatic Renewal</Typography>
        <Typography variant="subtitle1">
          Your Sponsorship is valid commencing on the date in which Scritch
          provides you with access to the Services pursuant to its receipt of
          your valid Payment Information (the “Commencement Date”) and will last
          for the duration of the Sponsorship term that you select at the time
          of your registration for the Sponsorship (the “Sponsorship Term”).
          <br />
          <br />
          YOUR SPONSORSHIP WILL AUTOMATICALLY RENEW AT THE END OF EACH
          SPONSORSHIP TERM FOR SUCCESSIVE SPONSORSHIP TERMS OF THE SAME DURATION
          AS THE SPONSORSHIP TERM ORIGINALLY SELECTED UNLESS THE SPONSORSHIP IS
          TERMINATED AND/OR CANCELED BY YOU OR SCRITCH PRIOR TO THE END OF SUCH
          SPONSORSHIP TERM. SUCH RENEWAL WILL OCCUR AUTOMATICALLY ON THE
          APPLICABLE ANNIVERSARY OF THE COMMENCEMENT DATE. YOU MAY CANCEL YOUR
          SPONSORSHIP AT ANY TIME PRIOR TO THE END OF THE SPONSORSHIP TERM
          THROUGH YOUR ACCOUNT SETTINGS IN THE SPONSORSHIP SECTION. You agree
          that upon such renewal, the credit card or other designated payment
          method in your Account Settings will be billed the applicable
          Sponsorship Fee for your Sponsorship Plan then in effect at the time
          of renewal. If you disagree with these automatic renewal provisions,
          your sole remedy is to cancel or terminate your Sponsorship.
          <br />
          <br />
          You acknowledge that the amount of the recurring charge at the time of
          Sponsorship renewal may differ from the Sponsorship Fees you
          originally paid for the Sponsorship if:
          <br />
          <br />
          the Sponsorship Fee for your Sponsorship Plan changes during your
          applicable Sponsorship Term, or;
          <br />
          if you change your Sponsorship Plan or Sponsorship Term during the
          previous Sponsorship Term.
          <br />
          <br />
          Scritch will notify you of any changes to the Sponsorship Fee prior to
          the date on which your Sponsorship Term will renew. You hereby agree
          to any such revised Sponsorship Fees and your sole remedy if you
          disagree with such changes is to cancel your subscription and stop
          using the Sponsorship.
        </Typography>
        {Spacer}
        <Typography variant="h5">
          3.5 Interruptions or Discontinuation of Scritch Sponsor Services;
          Changes to Scritch Sponsor Services and Terms of Use
        </Typography>
        <Typography variant="subtitle1">
          Scritch reserves the right at any time, at its sole discretion and
          without notice, to suspend, modify, discontinue or permanently cancel
          the Scritch Sponsor Services or any portions thereof, including the
          Sponsorship Plans and any policies, features and terms applicable
          thereto. If the Scritch Sponsor Services, or any part thereof, to
          which you subscribe are permanently discontinued or canceled by
          Scritch, your Sponsorship will terminate, and Scritch will have no
          further liability to you. You acknowledge that the Scritch Sponsor
          Services may be interrupted from time to time, with or without notice,
          for maintenance, upgrades, system updates or in the event of equipment
          failure or for any other foreseeable or unforeseeable cause.
          <br />
          <br />
          SCRITCH LIMITED WILL HAVE NO LIABILITY TO YOU FOR ANY INTERRUPTION,
          SUSPENSION, DISCONTINUANCE OR UNAVAILABILITY OF THE SCRITCH SPONSOR
          SERVICES FOR ANY REASON, OR FOR ANY LOSS OR INABILITY TO ACCESS ANY
          MEDIA OR MATERIALS ON THE SERVICES.
        </Typography>
        {Spacer}
        <Typography variant="h5">
          3.6 Service Access on Expiry of Sponsorship Term
        </Typography>
        <Typography variant="subtitle1">
          On expiry of the Sponsorship Term, and following non-renewal or
          purchase of a new Sponsorship Plan, account access will revert back to
          free-to-access Scritch Services only. The Scritch Sponsor Services and
          features will be no longer visible in the menu and unable to be
          accessed. On purchase of another Sponsorship Plan at a later date, all
          previously saved Scritch Sponsor Services and features will be
          restored to the user in last amended configuration.
        </Typography>
        {Spacer}
        <Typography variant="h5">3.7 Termination of Services</Typography>
        <Typography variant="subtitle1">
          You may request the termination of your Sponsorship at any time by
          canceling it in the Sponsorship section, or by sending an email to{" "}
          <a href="mailto:contact@scritch.es" className={classes.link}>
            contact@scritch.es
          </a>{" "}
          providing clear written notice of such request. When Scritch receives
          your termination request, Scritch will terminate your Sponsorship and
          inform you of such termination via notification. Your Sponsorship is
          not terminated until you receive confirmation of such termination from
          Scritch. If you terminate your Sponsorship, such termination will be
          effective at the end of any previously paid Sponsorship Term. By way
          of example and not in limitation of the foregoing, if you request the
          termination of your Sponsorship and you have one month remaining in
          your Sponsorship Term, such termination is effective at the end of the
          one month remaining in your Sponsorship Term and you will have access
          to the Scritch Sponsor Services for the remaining one month of such
          Sponsorship.
          <br />
          <br />
          Scritch may terminate a Sponsorship, or any user’s access to and use
          of the Scritch Sponsor Services, at any time for any reason at its
          sole discretion, which such termination will be effective immediately.
          If you violate the Terms of Use, Scritch at its sole discretion may:
          <br />
          <br />
          require you to remedy any violation thereof and/or;
          <br />
          take any other actions that Scritch deems appropriate to enforce its
          rights and pursue available remedies
          <br />
          <br />
          All Sponsorship Fees are non-refundable. Upon termination,
          cancellation or discontinuation of your Sponsorship for any reason,
          you will not be entitled to receive a refund for any Sponsorship Fees
          or other amounts previously charged to you, or for any unused portion
          of any Sponsorship Fees if such termination, cancellation or
          discontinuation occurs prior to the expiration of the applicable
          Sponsorship Term.
          <br />
          <br />
          If the Payment Information for your account is invalid and cannot be
          billed for the renewal Sponsorship Fee at the time such Sponsorship
          Fee is payable and due, then Scritch may terminate your Sponsorship
          for non-payment. If Scritch (or our applicable third party Payment
          Processor) does not have a current, working email address for your
          Sponsorship Plan, then you may not receive important correspondence
          regarding your account, including notices regarding invoicing.
        </Typography>
        {SpacerWithHR}
        <span id="copyright" className={classes.sectionPadder} />
        <Typography variant="h4">4 COPYRIGHT POLICY</Typography>
        <Typography variant="subtitle1">
          In accordance with the EU copyright directive, the text of which may
          be found on the European Commission website at
          <a
            href="https://ec.europa.eu/digital-single-market/en/eu-copyright-legislation"
            target="_blank"
            className={classes.link}
          >
            https://ec.europa.eu/digital-single-market/en/eu-copyright-legislation
          </a>
          , and other applicable laws, Scritch has adopted a policy of
          suspending, in appropriate circumstances and at Scritch’s sole
          discretion, the accounts of users who are deemed to be repeat
          infringers. Scritch may also, at its sole discretion, limit access to
          Scritch’s website and services and/or suspend the accounts of any
          users who infringe any intellectual property rights of others, whether
          or not there is any repeat infringement. Scritch will respond to
          claims of copyright infringement committed using Scritch that are
          reported to{" "}
          <a href="mailto:eucd@scritch.es" className={classes.link}>
            eucd@scritch.es
          </a>
          , identified in the sample notice below.
          <br />
          <br />
          If you knowingly misrepresent in your notification that the material
          or activity is infringing, you will be liable for any damages,
          including costs and attorneys’ fees, incurred by us or the alleged
          infringer as the result of our relying upon such misrepresentation in
          removing or disabling access to the material or activity claimed to be
          infringing. If you are a copyright owner, or are authorised to act on
          behalf of one, or authorised to act under any exclusive right under
          copyright, please report alleged copyright infringements taking place
          on or through the Services by completing the following Notice of
          Alleged Infringement and delivering it to{" "}
          <a href="mailto:eucd@scritch.es" className={classes.link}>
            eucd@scritch.es
          </a>
          . Upon receipt of the Notice, Scritch will take whatever action, at
          its sole discretion, it deems appropriate, including removal of the
          challenged material from the Services.
        </Typography>
        {Spacer}
        <Typography variant="h5">
          4.1 EUCD Notice of Alleged Infringement (“Notice”):
        </Typography>
        <Typography variant="subtitle1">
          Identify the copyrighted work that you claim has been infringed, or if
          multiple copyrighted works are covered by this Notice you may provide
          a representative list of the copyrighted works that you claim have
          been infringed.
          <br />
          <br />
          Identify the material that you claim is infringing (or to be the
          subject of infringing activity) and that is to be removed or access to
          which is to be disabled, and information reasonably sufficient to
          permit us to locate the material, including at a minimum, if
          applicable, the URL of the link shown on the Services where such
          material may be found.
          <br />
          <br />
          Include both of the following statements in the body of the Notice:
          <br />
          <br />
          “I hereby state that I have a good faith belief that the disputed use
          of the copyrighted material is not authorized by the copyright owner,
          its agent, or the law (e.g., as a fair use)"; and;
          <br />
          “I hereby state that the information in this Notice is accurate and,
          under penalty of perjury, that I am the owner, or authorized to act on
          behalf of the owner, of the copyright or of an exclusive right under
          the copyright that is allegedly infringed.”
          <br />
          <br />
          Provide your full legal name and your electronic or physical
          signature. Deliver this Notice, with all items completed.
        </Typography>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(TermsOfUse);
