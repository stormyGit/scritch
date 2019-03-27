import React from "react";
import ReactMarkdown from "react-markdown";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import PageTitle from "../Global/PageTitle";

import userGuide from "../../userGuide";

const styles = theme => ({
  card: {
    width: "100%",
    borderRadius: 0,
    paddingBottom: theme.spacing.unit * 8
  },
  content: {
    padding: theme.spacing.unit * 4
  },
  text: {
    fontWeight: 200,
    color: theme.palette.text.primary,
    fontFamily: "Roboto"
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  root: {
    width: "100%",
    padding: theme.spacing.unit * 1,
    paddingRight: 0,
    paddingBottom: theme.spacing.unit * 8
  },
  gridPadder: {
    width: "100%",
    paddingLeft: theme.spacing.unit * 16,
    paddingRight: theme.spacing.unit * 16
  }
});

class UserGuide extends React.Component {
  state = {};

  renderContent() {
    const { classes, announcement, horizontal } = this.props;

    return (
      <CardContent className={classes.content} className={classes.text}>
        <ReactMarkdown
          renderers={{
            link: props => <a className={classes.link} {...props} />
          }}
          source={userGuide}
        />
      </CardContent>
    );
  }

  renderVertical() {
    const { classes, announcement, width } = this.props;

    return (
      <Grid
        container
        className={
          width !== "lg" && width !== "xl" ? classes.root : classes.gridPadder
        }
        spacing={8}
        style={{ marginTop: width === "lg" || width === "xl" ? 4 : -4 }}
      >
        <Grid item xs={12}>
          <Card className={classes.card} elevation={0}>
            <h1 id="website-user-guide1">
              <strong>WEBSITE USER GUIDE</strong>
              <a href="#fn1" class="footnoteRef" id="fnref1">
                <sup>1</sup>
              </a>
            </h1>
            <p>
              Date of last revision: <strong>24 March 2019</strong>{" "}
              <strong>
                <em>
                  {" "}
                  ## <strong>CONTENTS</strong> LANDING PAGE CODE OF CONDUCT
                  SCRITCH TERMINOLOGY OUR PROMISE YOUR PROMISE CONTENT
                  RESTRICTIONS WEBSITE ARCHITECTURE{" "}
                  <em>&gt; Levels of Scritch User Accounts</em>{" "}
                  <em>&gt; User Level Transition</em>{" "}
                  <em>&gt; Involvement Monitoring</em>{" "}
                  <em>&gt; Involvement Action Weighting</em>{" "}
                  <em>&gt; Involvement Species</em> WHAT CAN I DO WITH SCRITCH?{" "}
                  <em>&gt; View Thumbnail Previews</em> <em>&gt; Register</em>{" "}
                  <em>&gt; Browse</em> <em>- Media Filter Data Fields</em>{" "}
                  <em>- Media Sort Data Fields</em>{" "}
                  <em>&gt; Claim a Fursuit Card</em>{" "}
                  <em>&gt; Claim a Maker Card</em> <em>&gt; Upload</em>{" "}
                  <em>&gt; Upload Guidelines</em> <em>&gt; Scritching</em>{" "}
                  <em>&gt; Sponsor</em> <em>&gt; Follow</em>{" "}
                  <em>- What Following a Fursuit Does</em>{" "}
                  <em>- What Following a Maker Does</em> <em>&gt; Tag</em>{" "}
                  <em>- What Tagging a Fursuit Does</em>{" "}
                  <em>- Tag Completion</em> <em>&gt; Favourite</em>{" "}
                  <em>&gt; Tip</em> <em>&gt; Advertise</em> <em>&gt; Block</em>{" "}
                  <em>&gt; Report</em>{" "}
                </em>
              </strong>{" "}
              ## <strong>LANDING PAGE</strong> Although Scritch has been
              designed to host strictly SFW Content, the Landing Page provides a
              means for the Website to confirm a User is over 18. By clicking
              “ENTER” the User is agreeing to the Website Terms and Conditions.
              ___ ## <strong>CODE OF CONDUCT</strong> Website Administrators
              police all aspects of Scritch User interaction, safeguarding them
              against: - Illegal Activity (as laid down by
              www.gov.uk/browse/justice) - NSFW Activity - Discrimination -
              Harassment - Identity Theft/Doxing - Threatening Behaviour -
              Gambling - Spam
            </p>
            <p>
              So this is as simple as the Code of Conduct gets. If Users don’t
              do anything that relates to any of the above, they will be
              interacting in line with the Code of Conduct!{" "}
              <strong>
                <em>
                  {" "}
                  ## <strong>SCRITCH TERMINOLOGY</strong> | Aspect | Term |
                  Description | | ------ | ------ | ------ | | Asset |{" "}
                  <strong>Asset</strong> |{" "}
                  <em>
                    An item of value generated through User Involvement, making
                    up the Website architecture.
                  </em>{" "}
                  | | Asset | <strong>Card</strong> |{" "}
                  <em>
                    Display of Asset attributes in a listed visual layout of
                    Data Fields able to be viewed by Users.
                  </em>{" "}
                  | | Asset | <strong>Category</strong> |{" "}
                  <em>
                    Category Tags allow the ability for Website Users to Browse
                    any subject matter making up the Category Database,
                    regardless of what Event the Content was captured at.
                  </em>{" "}
                  | | Asset | <strong>Content</strong> |{" "}
                  <em>
                    Any media uploaded by a User and hosted by the Website.
                  </em>{" "}
                  | | Asset | <strong>Data</strong> |{" "}
                  <em>
                    Information provided to the Website by Users through Fields.
                  </em>{" "}
                  | | Asset | <strong>Documentation</strong> |{" "}
                  <em>
                    Articles used for legal purposes which line out the terms of
                    Scritch User Involvement.
                  </em>{" "}
                  | | Asset | <strong>Edition</strong> |{" "}
                  <em>
                    An instance of an Event taking place on a date that is
                    unique to it.
                  </em>{" "}
                  | | Asset | <strong>Event</strong> |{" "}
                  <em>
                    Significant gathering of delegates, representatives, and
                    members of the Furry Fandom.
                  </em>{" "}
                  | | Asset | <strong>Field</strong> |{" "}
                  <em>Point for Data to be entered or viewed.</em> | | Asset |{" "}
                  <strong>Fursuit</strong>
                  <a href="#fn2" class="footnoteRef" id="fnref2">
                    <sup>2</sup>
                  </a>{" "}
                  |{" "}
                  <em>
                    A costume worn, based on an anthropomorphic projection of a
                    creature that at a minimum masks the wearer’s identity
                    through complete coverage of the wearer’s head.
                  </em>{" "}
                  | | Asset | <strong>Page</strong> |{" "}
                  <em>
                    Subdomain of the Website, supporting navigation of Services.
                  </em>{" "}
                  | | Asset | <strong>Service</strong> |{" "}
                  <em>
                    Website functionality available to User Accounts depending
                    on Level and Account Access.
                  </em>{" "}
                  | | Asset | <strong>Ticket</strong> |{" "}
                  <em>A work order that requires action to resolve.</em> | |
                  Asset | <strong>Website</strong> (www.scritch.es/<em>) | </em>
                  www.scritch.es and all subdomains that make up the User
                  interface, accessible through the world wide web.* | | Account
                  | <strong>Access</strong> |{" "}
                  <em>
                    Permission, liberty, or ability to enter, approach, or pass
                    to and from a Page on the Website.
                  </em>{" "}
                  | | Account | <strong>Account</strong> |{" "}
                  <em>
                    Set of Data relating to a Registered User, controlling
                    Access and recording Involvement with Website Pages and
                    Services.
                  </em>{" "}
                  | | Account | <strong>Admin</strong> |{" "}
                  <em>Account appointed to moderate Website Content.</em> | |
                  Account | <strong>Admin Pool</strong> |{" "}
                  <em>
                    The active group of Admins able to handle Website Tickets.
                  </em>{" "}
                  | | Account | <strong>Card Owner</strong> |{" "}
                  <em>
                    Account that has been given editable access to a Card.
                  </em>{" "}
                  | | Account | <strong>Community</strong> |{" "}
                  <em>All Accounts that make up the Website userbase.</em> | |
                  Account | <strong>Hiatus</strong> |{" "}
                  <em>
                    User Account that has applied limitations illustrated in
                    What can I do with Scritch? for a preset period of time.
                  </em>{" "}
                  | | Account | <strong>Level</strong> |{" "}
                  <em>
                    Account Access tiers which determine Services able to be
                    used by Accounts.
                  </em>{" "}
                  | | Account | <strong>Rank</strong> |{" "}
                  <em>
                    Value of a User Account related to their Involvement with
                    the Website.
                  </em>{" "}
                  | | Account | <strong>Session</strong> |{" "}
                  <em>Period of Website Access by User.</em> | | Account |{" "}
                  <strong>Sponsor</strong> |{" "}
                  <em>
                    User that is financially invested in the Website through
                    take out of Sponsorship subscription.
                  </em>{" "}
                  | | Account | <strong>Sponsorship</strong> |{" "}
                  <em>
                    Financial investment in the Website bound by period to
                    expiry or renewal.
                  </em>{" "}
                  | | Account | <strong>User</strong> |{" "}
                  <em>
                    Person using the Website at any level of Access through a
                    Account.
                  </em>{" "}
                  | | Service | <strong>Advertise</strong> |{" "}
                  <em>
                    Registered Users can Advertise on Scritch and manage their
                    Advertisement through the Dashboard provided.
                  </em>{" "}
                  | | Service | <strong>Claim</strong> |{" "}
                  <em>
                    Function that allows a Account to request Ownership of an
                    Card.
                  </em>{" "}
                  | | Service | <strong>Dashboard</strong> |{" "}
                  <em>
                    A visual overview to allow navigation or management of
                    Website Services.
                  </em>{" "}
                  | | Service | <strong>Database</strong> |{" "}
                  <em>
                    An electronic record of current Assets making up the
                    Website, able to be queried by Users through look up of
                    entered Data Fields in searches.
                  </em>{" "}
                  | | Service | <strong>Filter</strong> |{" "}
                  <em>
                    Visibility toggle of results from a Search query driven by
                    Filter(s) selected from the available Data Fields.
                  </em>{" "}
                  | | Service | <strong>Infraction</strong> |{" "}
                  <em>Violation or infringement of the Code of Conduct.</em> | |
                  Service | <strong>Involvement</strong> |{" "}
                  <em>
                    All User activity through Website Services permitted by
                    Account Access.
                  </em>{" "}
                  | | Service | <strong>Login</strong> |{" "}
                  <em>
                    Successful validation of existing User credentials to obtain
                    Access to the Website and control of User Account, marking
                    the start of a Session.
                  </em>{" "}
                  | | Service | <strong>Logout</strong> |{" "}
                  <em>
                    End of a Session through offload of User credentials,
                    disconnecting the User with the Account through the Website
                    on their current browser.
                  </em>{" "}
                  | | Service | <strong>Notification</strong> |{" "}
                  <em>
                    Alert posted to a User that informs of Website activity
                    according to their Account Settings and Access Level.
                  </em>{" "}
                  | | Service | <strong>Search</strong> |{" "}
                  <em>
                    A query by a User to the Website Database in order to
                    retrieve and view Cards able to be Filtered and Sorted with
                    the available Data Fields.
                  </em>{" "}
                  | | Service | <strong>Sort</strong> |{" "}
                  <em>
                    Order of results from a Search query driven by the Sort
                    option from the available Data Fields.
                  </em>{" "}
                  | | Service | <strong>Tag</strong> |{" "}
                  <em>
                    An item that makes up Asset Data Fields on the Website,
                    selectively made visible to users in the completion of
                    Filters to allow search of Content.
                  </em>{" "}
                  | | Service | <strong>Upload</strong> |{" "}
                  <em>
                    Process of media file transfer from an offline location
                    through Scritch which results in Content creation on the
                    Website.
                  </em>{" "}
                  |{" "}
                </em>
              </strong>{" "}
              ## <strong>OUR PROMISE</strong> &gt; Scritch promises to maintain
              past, present, and future: Convention, Maker, and Fursuit Cards to
              allow a complete chronical of all Content, able to be tagged also
              by Category. The Admin Pool ensures User safety and security by
              keeping all Involvement on www.scritch.es/* within the Website
              Code of Conduct and media in line with Content Restrictions below.{" "}
              <strong>
                <em>
                  {" "}
                  ## <strong>YOUR PROMISE</strong> &gt; You (the User) promise
                  to adhere to the Code of Conduct and Content Restrictions put
                  in place to safeguard all Users of the Website.{" "}
                </em>
              </strong>{" "}
              ## <strong>CONTENT RESTRICTIONS</strong> User Content is laid out
              in the Terms of Use Policy in section:{" "}
              <strong>Acceptable Use; Disclaimer</strong>, however to be clear
              in this document; the Website will maintain SFW content through
              not hosting: | Restriction | Description | | ------ | ------ | |{" "}
              <strong>NSFW</strong> |{" "}
              <em>
                Sexually explicit content (cropped or censored) including (but
                not limited to) images, acts, or links to external sources.
              </em>{" "}
              | | <strong>Body Fluids</strong> |{" "}
              <em>Depictions of actual/real bodily fluids.</em> | |{" "}
              <strong>Injury</strong> |{" "}
              <em>
                Depictions of actual/real physical harm to individuals or
                creatures.
              </em>{" "}
              | | <strong>Violence</strong> |{" "}
              <em>
                Depictions of actual/real violence towards individuals,
                creatures, or property.
              </em>{" "}
              | | <strong>Hate/Discrimination</strong> |{" "}
              <em>
                Hateful or discriminating subject matter including (but not
                limited to): sexism, racism, bullying, or harassment.
              </em>{" "}
              | | <strong>Not a Fursuit</strong>
              <a href="#fn3" class="footnoteRef" id="fnref3">
                <sup>3</sup>
              </a>{" "}
              |{" "}
              <em>
                A costume that does not match the description of a Fursuit as
                laid out in the Website Asset Terms table
              </em>
              | ___ ## <strong>WEBSITE ARCHITECTURE</strong> ###{" "}
              <strong>Levels of Scritch User Accounts</strong> | Level |
              Description | ------ | ------ | | <strong>Unregistered</strong> |{" "}
              <em>
                Users are Unregistered prior to creating a Account or whilst
                logged out of Scritch.
              </em>{" "}
              | | <strong>Registered</strong> |{" "}
              <em>
                Users are Registered after they have created a Account by
                logging into Scritch.
              </em>{" "}
              | | <strong>Card Owner</strong> |{" "}
              <em>
                Users are Card Owners once they have successfully claimed a
                Fursuit Card or Maker Card.
              </em>{" "}
              | | <strong>Sponsor</strong> |{" "}
              <em>
                Users are Sponsors whilst they have an active Sponsorship
                subscription.
              </em>{" "}
              | | <strong>Admin</strong> |{" "}
              <em>
                Users are Admins that have been promoted by Scritch to gain
                Access to Website moderator Services.
              </em>{" "}
              | | <strong>Hiatus</strong> |{" "}
              <em>
                Users are placed on Hiatus as a form of time out following
                breach of Scritch’s Code of Conduct for a preset period of time.
              </em>{" "}
              | ### <strong>User Level Transition</strong> Users transition
              between the above levels as shown in the table below: | Start
              Level | Action | End Level | | :------ | :------: | ------: | |
              Unregistered | <strong>Register</strong> | Registered | |
              Registered | <strong>Log Out</strong> | Unregistered | |
              Registered | <strong>Claim Successful</strong> | Card Owner | |
              Registered | <strong>Sponsorship</strong> | Sponsor | | Registered
              | <strong>Positive Involvement</strong> | Admin | | Admin |{" "}
              <strong>Negative Involvement</strong> | Registered | | Registered
              | <strong>Negative Involvement</strong> | Hiatus | | Hiatus |{" "}
              <strong>Hiatus Time Elapses</strong> | Registered | ####{" "}
              <strong>Involvement Monitoring</strong> Involvement of every user
              is tracked through discrete algorithms that allow periodic review
              of the Website Owners to amend User Levels accordingly. ####
              Involvement Action Weighting User Involvement Actions are weighted
              in line with the points system below. If a Account Owns multiple
              Fursuits, points weighted against actions related to each Fursuit
              will aggregate to a total points score for the Account itself. |
              Action | Effect | Points | | :------ | :------: | :------: | |{" "}
              <strong>Upload Media</strong> | <strong>Positive</strong> |{" "}
              <strong>1</strong> | | <strong>Comment</strong> |{" "}
              <strong>Positive</strong> | <strong>1</strong> | |{" "}
              <strong>Tag</strong> | <strong>Positive</strong> |{" "}
              <strong>1</strong> | | <strong>Invalidated Tag</strong> | Negative
              | -10 | | <strong>Give a Scritch</strong> |{" "}
              <strong>Positive</strong> | 1 | |{" "}
              <strong>Give a Favourite</strong> | <strong>Positive</strong> | 1
              | | <strong>Give a Follow</strong> | <strong>Positive</strong> | 1
              | | <strong>Receive a Scritch</strong> | <strong>Positive</strong>{" "}
              | 1 | | <strong>Receive a Favourite</strong> |{" "}
              <strong>Positive</strong> | 2 | |{" "}
              <strong>Receive a Follow</strong> | <strong>Positive</strong> | 2
              | | <strong>Report Ticket Validated</strong> |{" "}
              <strong>Positive</strong> | 10 | |{" "}
              <strong>Report Ticket Invalidated</strong> | Negative | -10 | |{" "}
              <strong>Report on User Involvement Reviewed = Infraction</strong>{" "}
              | Negative | -10 | |{" "}
              <strong>
                Report on User Involvement Reviewed = No Infraction
              </strong>{" "}
              | Nil | 0 | #### Involvement Species As a User Account Involvement
              score increases, an Involvement Species is assigned in Rank up
              alphabetically through tiers set by the following formula:
            </p>
            <p>
              <strong>
                Involvement Species User Block = Total Number of Users / Total
                Number of Species
              </strong>
            </p>
            <p>
              <strong>
                <em>Example 1</em>
              </strong>{" "}
              &gt; Total Number of Users: 750 &gt; Total Number of Species: 180{" "}
              <strong>750 / 180 = 4.17</strong> (Rounded Down to 4) Equates to a
              User Species Block value of <strong>4</strong>. Allowing a top
              heavy top user species by addressing the decimal:{" "}
              <strong>4 x 179 = 716</strong> (Everything Above{" "}
              <strong>716</strong> Top User Block) = <strong>34 Zebras</strong>
            </p>
            <p>
              <strong>
                <em>Example 2</em>
              </strong>{" "}
              &gt; Total Number of Users: 17560 &gt; Total Number of Species:
              240 <strong>17560 / 240 = 73.17</strong> (Rounded Down to 73)
              Equates to a User Species Block value of <strong>73</strong>.
              Allowing a top heavy top user species by addressing the decimal:{" "}
              <strong>73 x 239 = 17447</strong> (Everything Above{" "}
              <strong>17447</strong> Top User Block) ={" "}
              <strong>113 Zebras</strong>{" "}
              <strong>
                <em>
                  {" "}
                  ## <strong>WHAT CAN I DO WITH SCRITCH?</strong> Scritch allows
                  the following User involvement with limitations illustrated
                  for Accounts under hiatus: - View Thumbnail Previews - Read
                  Website Documentation - Register - Browse - Claim a Fursuit
                  Card{" "}
                  <strong>
                    <em>(Not Available During Hiatus)</em>
                  </strong>{" "}
                  - Claim a Maker Card{" "}
                  <strong>
                    <em>(Not Available During Hiatus)</em>
                  </strong>{" "}
                  - Upload{" "}
                  <strong>
                    <em>(Not Available During Hiatus)</em>
                  </strong>{" "}
                  - Tag{" "}
                  <strong>
                    <em>(Not Available During Hiatus)</em>
                  </strong>{" "}
                  - Follow{" "}
                  <strong>
                    <em>(Not Available During Hiatus)</em>
                  </strong>{" "}
                  - Scritch{" "}
                  <strong>
                    <em>(Not Available During Hiatus)</em>
                  </strong>{" "}
                  - Favourite{" "}
                  <strong>
                    <em>(Not Available During Hiatus)</em>
                  </strong>{" "}
                  - Private Message{" "}
                  <strong>
                    <em>(Not Available During Hiatus)</em>
                  </strong>{" "}
                  - Tip - Sponsor - Advertise - Block - Report{" "}
                  <strong>
                    <em>(Not Available During Hiatus)</em>
                  </strong>{" "}
                </em>
              </strong>{" "}
              ### <strong>VIEW THUMBNAIL PREVIEWS</strong> Scritch allows
              thumbnail view of Website Content to allow Unregistered User
              thumbnail preview of content.{" "}
              <strong>
                <em>
                  {" "}
                  ### <strong>READ WEBSITE DOCUMENTATION</strong> Scritch allows
                  perusal of Website Documentation, which includes: - Terms and
                  Conditions - Privacy Policy - API Policy - Website User Guide{" "}
                  <strong>
                    <em>(this Document)</em>
                  </strong>{" "}
                  - FAQs{" "}
                </em>
              </strong>{" "}
              ### <strong>REGISTER</strong> Registering with Scritch through:
              Telegram, Twitter, and Facebook Login credentials is through click
              of the “LOGIN” button to the top right of the Homepage. ___ ###{" "}
              <strong>BROWSE</strong> Registered Users can browse the following
              extensive Databases which drop down as a sub menu of the Website
              sidebar when the User clicks the “Browse” menu item: - Media -
              Fursuit - Maker - Events
            </p>
            <p>
              Each Database has been furnished with a custom set of Filters and
              Sort functions, allowing users to find what they are looking for
              with only a small amount of known Data Fields, these are as
              follows: #### Media Filter Data Fields | Filter | Results Display
              | | ------ | ------ | | <strong>Fursuit</strong> |{" "}
              <em>
                Only Content tagged with the Filtered Fursuit(s) (Filtering
                multiple Fursuits returns Content with any of the Fursuits added
                to the Filtered list).
              </em>{" "}
              | | <strong>Event</strong> |{" "}
              <em>
                Only Content tagged with the Filtered Event. Selecting an Event
                expands Filter set to include the Edition field.
              </em>{" "}
              | | <strong>Edition</strong> |{" "}
              <em>Only Content tagged with the Filtered Event Edition.</em> | |{" "}
              <strong>Category</strong> |{" "}
              <em>Only Content tagged with the Filtered Category.</em> | ####
              Media Sort Data Fields | Sort | Results Display in Order of | |
              ------ | ------ | | <strong>Earliest First</strong> |{" "}
              <em>Date captured from earliest to latest.</em> | |{" "}
              <strong>Latest First</strong> |{" "}
              <em>Date captured from latest to earliest.</em> | |{" "}
              <strong>Most Scritches</strong> |{" "}
              <em>
                Amount of Scritches content has received from User Involvement.
              </em>{" "}
              | | <strong>Most Views</strong> |{" "}
              <em>
                Amount of Views content has received from User Involvement.
              </em>{" "}
              | | <strong>Most Favourites</strong> |{" "}
              <em>
                Amount of Favourites content has received from User Involvement.
              </em>{" "}
              | ___ ### <strong>CLAIM A FURSUIT CARD</strong> A Account can
              Claim one Fursuit Card a day (this restriction has been put in
              place to safeguard against misuse).
            </p>
            <p>
              Only an unclaimed Fursuit Card can be claimed by a Account and
              must only be claimed by Accounts that <strong>currently</strong>{" "}
              own them in real life.
            </p>
            <p>
              To claim a Fursuit Card, locate a Fursuit from the Fursuit
              Database through the Browse Service of the Website, then view the
              related Fursuit Card in full screen. You will see a “Claim”
              button; by clicking this, you will presented with… ___ ###{" "}
              <strong>CLAIM A MAKER CARD</strong> A Account can claim only one
              Maker Card (this restriction has been put in place to safeguard
              against misuse).
            </p>
            <p>
              Only an unclaimed Maker Card can be claimed by a Account and Maker
              Cards must only be claimed by Accounts that are/were owned by the
              Maker Studio in real life.
            </p>
            <p>
              To claim a Maker Card, SHOULD WE MAKE THIS A TICKET? ___ ###{" "}
              <strong>UPLOAD</strong> Any Account not under Hiatus can Upload
              media files to Scritch. By Uploading the media to Scritch you
              grant the Website the ability to host the Content to support all
              User Involvement.
            </p>
            <p>
              Accounts that are owned by the media creator in real life are best
              placed to Upload, with the Tagging Service then able to notify
              Card Owners and link Website Assets held in its Databases.
            </p>
            <p>
              On Uploading media to Scritch, an Event and Edition must be
              assigned or a Category selected (if the media was not captured at
              a specific Event Edition), this is because the Uploader is the
              most likely to know where the media was captured.
            </p>
            <p>
              There is no limit to how many articles of media can be uploaded to
              Scritch, however guidelines apply to media Uploaded onto the
              Website, which safeguards User exposure to inappropriate Content
              listed out in Content Restrictions. #### Upload Guidelines
              Additional Upload guidelines to maximise the accuracy and
              effectiveness of Scritch are as follows: | Guideline | Guidance |
              | ------ | ------ | | <strong>Permission</strong> |{" "}
              <em>
                You must have captured the media or have permission from the
                media creator to Upload it to Scritch.
              </em>{" "}
              | | <strong>Limit Spam</strong> |{" "}
              <em>
                Keep Uploaded media as individual snapshots from collections
                where minimal changes occur between each article in the
                collection.
              </em>{" "}
              | | <strong>Batch Upload</strong> |{" "}
              <em>
                Since Event and Edition Tags are mandatory on any media Uploaded
                to Scritch, Uploaders should batch Upload media by Event Edition
                or Category (if not related to an Event) to prevent confusion
                and corruption of the Content Database.
              </em>{" "}
              |{" "}
              <strong>
                <em>
                  {" "}
                  ### <strong>SCRITCHING</strong> Any Registered User can show
                  their like of Content by “Scritching” it. All Scritches are
                  recorded and influence the hierarchy of Assets that are linked
                  to the Content along with its Rating on the Website. To
                  Scritch a Content, click the Scritch icon indicated by a
                  “?????”.{" "}
                </em>
              </strong>{" "}
              ### <strong>SPONSOR</strong> Any Registered User can choose to
              Sponsor Scritch, which unlocks the following additional Services
              for their Account: - Ability to Favourite Content - Organise
              Favourited Content in Custom Galleries - Follow Fursuit Cards -
              Follow Maker Cards - Toggle Advertisement Visibility
            </p>
            <p>
              To Sponsor Scritch, navigate to the Sponsor area of the sidebar
              and click “???”, then follow the on screen prompts. ___ ###{" "}
              <strong>FOLLOW</strong> A Sponsor can choose to Follow a: -
              Fursuit - Maker - Category (Phase 2) - Convention (Phase 2)
            </p>
            <h4 id="what-following-a-fursuit-does">
              What Following a Fursuit Does
            </h4>
            <p>
              Following a Fursuit raises the Fursuit Card Follower metric by 1
              and Notifies the Fursuit Card Owner that their Fursuit has been
              Followed.
            </p>
            <p>
              A Follower of a Fursuit will receive Notifications of any Content
              that the Fursuit Card is linked to from that point on.
            </p>
            <p>
              To Follow Fursuits, locate them from the Fursuit Database, then
              view the related Fursuit Card full screen. You will see a “Follow”
              button; by clicking this, you will presented with… #### What
              Following a Maker Does Following a Maker raises the Maker Card
              Follower metric by 1 and Notifies the Maker Card Owner that their
              studio has been Followed.
            </p>
            <p>
              A Follower of a Maker will receive Notifications of a newly
              created Fursuit that is assigned the Maker and any Commission
              Status changes that the Maker Card Owner makes from that point on.
            </p>
            <p>
              To Follow Makers, locate them from the Maker Database, then view
              the related Maker Card full screen. You will see a “Follow”
              button; by clicking this, you will presented with… ___ ###{" "}
              <strong>TAG</strong> In order to Tag Content, navigate to the
              Tagging Console in the sidebar of Scritch.
            </p>
            <p>
              The Tagging console allows sort by Tag completion of Content (See
              Tag Completion section of this guide). #### What Tagging a Fursuit
              Does Tagging a Fursuit in Content creates a Website link between
              the Content and Fursuit Card and Notifies the Fursuit Card Owner
              that their Fursuit has been Tagged (via Dashboard Notification).
            </p>
            <p>
              Also, Tagging a Fursuit Notifies Followers of the Fursuit Card
              that their Followed Fursuit has new Content to be seen. #### Tag
              Completion All Content Uploaded to Scritch holds a Tag Completion
              percentage, this is broken down by Data Fields as follows: | Data
              Field | Percentage | | ------ | ------ | | Number of Fursuits |
              Take from Stormy. | | Fursuits | Take from Stormy. | | Category |
              Take from Stormy. |
            </p>
            <p>
              The goal is for all Content to achieve 100% Tag Completion, which
              means all Assets have been Tagged correctly. ___ ###{" "}
              <strong>FAVOURITE</strong> A sponsor can choose to favourite an
              article of media.
            </p>
            <p>
              Favouriting Content increases the Favourite count of the Uploader
              Account and locates the Content in the customisable Favourites
              Gallery area of the User that Favourited it.
            </p>
            <p>
              Sponsors can sort Favourites into albums to allow custom gallery
              organisation relevant to their interests. ___ ###{" "}
              <strong>TIP</strong> Any Registered User can choose to Tip
              Scritch.
            </p>
            <p>
              Tipping is greatly appreciated and supports future development of
              additional Services.
            </p>
            <p>
              To Tip Scritch, navigate to the Tip menu item of the Website
              sidebar and... ___ ### <strong>ADVERTISE</strong> Any Registered
              User can choose to Advertise on Scritch.
            </p>
            <p>
              Advertisements must adhere to the Website Code of Conduct and be
              Furry related.
            </p>
            <p>
              To Advertise with Scritch, click Ads &amp; Social in the Website
              header and and... ___ ### <strong>BLOCK</strong> Any Registered
              User can choose to Block another User on Scritch to prevent
              Following and contact whilst the Block is active.
            </p>
            <p>Blocked users can be unblocked through the…</p>
            <p>
              To Block a Account... ___ ### <strong>REPORT</strong> Scritch will
              draw upon its Admin Pool to handle any Report Tickets generated by
              Website Users.
            </p>
            <p>
              Any Registered user can submit a Report to challenge anything that
              does not adhere to the Scritch Code of Conduct or anything that is
              incorrect on the Website.
            </p>
            <p>To submit a Report, click...</p>
            <p>
              All reports are handled by the Admin Pool in a timely fashion
              relative to the number of Tickets received and the number of
              Admins in the Admin Pool.
            </p>
            <div class="footnotes">
              <hr />
              <ol>
                <li id="fn1">
                  <p>
                    <strong>Website</strong>: For the purposes of this Website
                    User Guide, “Website” refers to www.scritch.es and all
                    sub-domains.<a href="#fnref1">↩</a>
                  </p>
                </li>
                <li id="fn2">
                  <p>
                    <strong>Fursuit</strong>: A costume worn, based on an
                    anthropomorphic projection of a creature that at a minimum
                    masks the wearer’s identity through complete coverage of the
                    wearer’s head.<a href="#fnref2">↩</a>
                  </p>
                </li>
                <li id="fn3">
                  <p>
                    <strong>Fursuit</strong>: A costume worn, based on an
                    anthropomorphic projection of a creature that at a minimum
                    masks the wearer’s identity through complete coverage of the
                    wearer’s head.<a href="#fnref3">↩</a>
                  </p>
                </li>
              </ol>
            </div>
          </Card>
        </Grid>
      </Grid>
    );
  }

  render() {
    const { horizontal } = this.props;

    return (
      <React.Fragment>
        <PageTitle>User Guide</PageTitle>
        {this.renderVertical()}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(UserGuide));
