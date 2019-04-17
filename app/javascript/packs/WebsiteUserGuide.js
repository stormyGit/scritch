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

const terminologyTableRows = [
  {
    aspect: "Asset",
    term: "Asset",
    description:
      "An item of value generated through User Involvement, making up the Website architecture."
  },
  {
    aspect: "Asset",
    term: "Card",
    description:
      "Display of Asset attributes in a listed visual layout of Data Fields able to be viewed by Users."
  },
  {
    aspect: "Asset",
    term: "Category",
    description:
      "Category Tags allow the ability for Website Users to Browse any subject matter making up the Category Database, regardless of what Event the Content was captured at."
  },
  {
    aspect: "Asset",
    term: "Content",
    description: "Any media uploaded by a User and hosted by the Website."
  },
  {
    aspect: "Asset",
    term: "Data",
    description: "Information provided to the Website by Users through Fields."
  },
  {
    aspect: "Asset",
    term: "Documentation",
    description:
      "Articles used for legal purposes which line out the terms of Scritch User Involvement."
  },
  {
    aspect: "Asset",
    term: "Edition",
    description:
      "An instance of an Event taking place on a date that is unique to it."
  },
  {
    aspect: "Asset",
    term: "Event",
    description:
      "Significant gathering of delegates, representatives, and members of the Furry Fandom."
  },
  {
    aspect: "Asset",
    term: "Field",
    description: "Point for Data to be entered or viewed."
  },
  {
    aspect: "Asset",
    term: "Fursuit",
    description:
      "A costume worn, based on an anthropomorphic projection of a creature that at a minimum masks the wearer’s identity through complete coverage of the wearer’s head."
  },
  {
    aspect: "Asset",
    term: "Page",
    description: "Subdomain of the Website, supporting navigation of Services."
  },
  {
    aspect: "Asset",
    term: "Service",
    description:
      "Website functionality available to User Accounts depending on Level and Account Access."
  },
  {
    aspect: "Asset",
    term: "Ticket",
    description: "A work order that requires action to resolve."
  },
  {
    aspect: "Asset",
    term: "Website (www.scritch.es/*)",
    description:
      "www.scritch.es and all subdomains that make up the User interface, accessible through the world wide web."
  },
  {
    aspect: "Account",
    term: "Access",
    description:
      "Permission, liberty, or ability to enter, approach, or pass to and from a Page on the Website."
  },
  {
    aspect: "Account",
    term: "Account",
    description:
      "Set of Data relating to a Registered User, controlling Access and recording Involvement with Website Pages and Services."
  },
  {
    aspect: "Account",
    term: "Admin",
    description: "Account appointed to moderate Website Content."
  },
  {
    aspect: "Account",
    term: "Admin Pool",
    description: "The active group of Admins able to handle Website Tickets."
  },
  {
    aspect: "Account",
    term: "Card Owner",
    description: "Account that has been given editable access to a Card."
  },
  {
    aspect: "Account",
    term: "Community",
    description: "All Accounts that make up the Website userbase."
  },
  {
    aspect: "Account",
    term: "Hiatus",
    description:
      "User Account that has applied limitations illustrated in What can I do with Scritch? for a preset period of time."
  },
  {
    aspect: "Account",
    term: "Level",
    description:
      "Account Access tiers which determine Services able to be used by Accounts."
  },
  {
    aspect: "Account",
    term: "Rank",
    description:
      "Value of a User Account related to their Involvement with the Website."
  },
  {
    aspect: "Account",
    term: "Session",
    description: "Period of Website Access by User."
  },
  {
    aspect: "Account",
    term: "Sponsor",
    description:
      "User that is financially invested in the Website through take out of Sponsorship subscription."
  },
  {
    aspect: "Account",
    term: "Sponsorship",
    description:
      "Financial investment in the Website bound by period to expiry or renewal."
  },
  {
    aspect: "Account",
    term: "User",
    description:
      "Person using the Website at any level of Access through a Account."
  },
  {
    aspect: "Service",
    term: "Advertise",
    description:
      "Registered Users can Advertise on Scritch and manage their Advertisement through the Dashboard provided."
  },
  {
    aspect: "Service",
    term: "Claim",
    description:
      "Function that allows a Account to request Ownership of an Card."
  },
  {
    aspect: "Service",
    term: "Dashboard",
    description:
      "A visual overview to allow navigation or management of Website Services."
  },
  {
    aspect: "Service",
    term: "Database",
    description:
      "An electronic record of current Assets making up the Website, able to be queried by Users through look up of entered Data Fields in searches."
  },
  {
    aspect: "Service",
    term: "Filter",
    description:
      "Visibility toggle of results from a Search query driven by Filter(s) selected from the available Data Fields."
  },
  {
    aspect: "Service",
    term: "Infraction",
    description: "Violation or infringement of the Code of Conduct."
  },
  {
    aspect: "Service",
    term: "Involvement",
    description:
      "All User activity through Website Services permitted by Account Access."
  },
  {
    aspect: "Service",
    term: "Login",
    description:
      "Successful validation of existing User credentials to obtain Access to the Website and control of User Account, marking the start of a Session."
  },
  {
    aspect: "Service",
    term: "Logout",
    description:
      "End of a Session through offload of User credentials, disconnecting the User with the Account through the Website on their current browser."
  },
  {
    aspect: "Service",
    term: "Notification",
    description:
      "Alert posted to a User that informs of Website activity according to their Account Settings and Access Level."
  },
  {
    aspect: "Service",
    term: "Search",
    description:
      "A query by a User to the Website Database in order to retrieve and view Cards able to be Filtered and Sorted with the available Data Fields."
  },
  {
    aspect: "Service",
    term: "Sort",
    description:
      "Order of results from a Search query driven by the Sort option from the available Data Fields."
  },
  {
    aspect: "Service",
    term: "Tag",
    description:
      "An item that makes up Asset Data Fields on the Website, selectively made visible to users in the completion of Filters to allow search of Content."
  },
  {
    aspect: "Service",
    term: "Upload",
    description:
      "Process of media file transfer from an offline location through Scritch which results in Content creation on the Website."
  }
];

const contentRestrictionsRows = [
  {
    restriction: "NSFW",
    description:
      "Sexually explicit content (cropped or censored) including (but not limited to) images, acts, or links to external sources."
  },
  {
    restriction: "Body Fluids",
    description: "Depictions of actual/real bodily fluids."
  },
  {
    restriction: "Injury",
    description:
      "Depictions of actual/real physical harm to individuals or creatures."
  },
  {
    restriction: "Violence",
    description:
      "Depictions of actual/real violence towards individuals, creatures, or property."
  },
  {
    restriction: "Hate/Discrimination",
    description:
      "Hateful or discriminating subject matter including (but not limited to): sexism, racism, bullying, or harassment."
  },
  {
    restriction: "Not a Fursuit",
    description:
      "A costume that does not match the description of a Fursuit as laid out in the Website Asset Terms table"
  }
];

const accountLevelsRows = [
  {
    level: "Unregistered",
    description:
      "Users are Unregistered prior to creating a Account or whilst logged out of Scritch."
  },
  {
    level: "Registered",
    description:
      "Users are Registered after they have created a Account by logging into Scritch."
  },
  {
    level: "Card Owner",
    description:
      "Users are Card Owners once they have successfully claimed a Fursuit Card or Maker Card."
  },
  {
    level: "Sponsor",
    description:
      "Users are Sponsors whilst they have an active Sponsorship subscription."
  },
  {
    level: "Admin",
    description:
      "Users are Admins that have been promoted by Scritch to gain Access to Website moderator Services."
  },
  {
    level: "Hiatus",
    description:
      "Users are placed on Hiatus as a form of time out following breach of Scritch’s Code of Conduct for a preset period of time."
  }
];

const levelTransitionsRows = [
  { start_level: "Unregistered", action: "Register", end_level: "Registered" },
  { start_level: "Registered", action: "Log Out", end_level: "Unregistered" },
  {
    start_level: "Registered",
    action: "Claim Successful",
    end_level: "Card Owner"
  },
  { start_level: "Registered", action: "Sponsorship", end_level: "Sponsor" },
  {
    start_level: "Registered",
    action: "Positive Involvement",
    end_level: "Admin"
  },
  {
    start_level: "Admin",
    action: "Negative Involvement",
    end_level: "Registered"
  },
  {
    start_level: "Registered",
    action: "Negative Involvement",
    end_level: "Hiatus"
  },
  {
    start_level: "Hiatus",
    action: "Hiatus Time Elapses",
    end_level: "Registered"
  }
];

const involvementActionsRows = [
  { action: "Upload Media", effect: "Positive", points: "1" },
  { action: "Comment", effect: "Positive", points: "1" },
  { action: "Tag", effect: "Positive", points: "1" },
  { action: "Invalidated Tag", effect: "Negative", points: "-10" },
  { action: "Give a Scritch", effect: "Positive", points: "1" },
  { action: "Give a Favourite", effect: "Positive", points: "1" },
  { action: "Give a Follow", effect: "Positive", points: "1" },
  { action: "Receive a Scritch", effect: "Positive", points: "1" },
  { action: "Receive a Favourite", effect: "Positive", points: "2" },
  { action: "Receive a Follow", effect: "Positive", points: "2" },
  { action: "Report Ticket Validated", effect: "Positive", points: "10" },
  { action: "Report Ticket Invalidated", effect: "Negative", points: "-10" },
  {
    action: "Report on User Involvement Reviewed = Infraction",
    effect: "Negative",
    points: "-10"
  },
  {
    action: "Report on User Involvement Reviewed = No Infraction",
    effect: "Nil",
    points: "0"
  }
];

const mediaFiltersRows = [
  {
    filter: "Fursuit",
    result:
      "Only Content tagged with the Filtered Fursuit(s) (Filtering multiple Fursuits returns Content with any of the Fursuits added to the Filtered list)."
  },
  {
    filter: "Event",
    result:
      "Only Content tagged with the Filtered Event. Selecting an Event expands Filter set to include the Edition field."
  },
  {
    filter: "Edition",
    result: "Only Content tagged with the Filtered Event Edition."
  },
  {
    filter: "Category",
    result: "Only Content tagged with the Filtered Category."
  }
];

const mediaSortRows = [
  { sort: "Earliest First", result: "Date captured from earliest to latest." },
  { sort: "Latest First", result: "Date captured from latest to earliest." },
  {
    sort: "Most Scritches",
    result: "Amount of Scritches content has received from User Involvement."
  },
  {
    sort: "Most Views",
    result: "Amount of Views content has received from User Involvement."
  },
  {
    sort: "Most Favourites",
    result: "Amount of Favourites content has received from User Involvement."
  }
];

const uploadGuidelinesRows = [
  {
    guideline: "Permission",
    guidance:
      "You must have captured the media or have permission from the media creator to Upload it to Scritch."
  },
  {
    guideline: "Limit Spam",
    guidance:
      "Keep Uploaded media as individual snapshots from collections where minimal changes occur between each article in the collection."
  },
  {
    guideline: "Batch Upload",
    guidance:
      "Since Event and Edition Tags are mandatory on any media Uploaded to Scritch, Uploaders should batch Upload media by Event Edition or Category (if not related to an Event) to prevent confusion and corruption of the Content Database."
  }
];

const tagCompletionRows = [
  { field: "Number of Fursuits", percentage: "Take from Stormy." },
  { field: "Fursuits", percentage: "Take from Stormy." },
  { field: "Category", percentage: "Take from Stormy." }
];

class WebsiteUserGuide extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h2" id="website-user-guide1">
          WEBSITE USER GUIDE
        </Typography>
        <Typography variant="subtitle1">
          Date of last revision: <strong>24 March 2019</strong>
        </Typography>
        {SpacerWithHR}
        <Typography variant="h4" id="contents">
          CONTENTS
        </Typography>
        <Typography variant="subtitle1">
          <a href="#landing_page" className={classes.link}>
            LANDING PAGE
          </a>
          <br />
          <a href="#code_conduct" className={classes.link}>
            CODE OF CONDUCT
          </a>
          <br />
          <a href="#terminology" className={classes.link}>
            SCRITCH TERMINOLOGY
          </a>
          <br />
          <a href="#our_promise" className={classes.link}>
            OUR PROMISE
          </a>
          <br />
          <a href="#your_promise" className={classes.link}>
            YOUR PROMISE
          </a>
          <br />
          <a href="#content_restrictions" className={classes.link}>
            CONTENT RESTRICTIONS
          </a>
          <br />
          <a href="#architecture" className={classes.link}>
            WEBSITE ARCHITECTURE
          </a>
          <br />
          {"> Levels of Scritch User Accounts"}
          <br />
          {"> User Level Transition"}
          <br />
          {"> Involvement Monitoring"}
          <br />
          {"> Involvement Action Weighting"}
          <br />
          {"> Involvement Species"}
          <br />
          <a href="#what_can_i_do" className={classes.link}>
            WHAT CAN I DO WITH SCRITCH?
          </a>
          <br />
          {"> View Thumbnail Previews"}
          <br />
          {"> Register"}
          <br />
          {"> Browse"}
          <br />
          {"- Media Filter Data Fields"}
          <br />
          {"> Claim a Fursuit Card"}
          <br />
          {"- Media Sort Data Fields"}
          <br />
          {"> Claim a Maker Card"}
          <br />
          {"> Upload"}
          <br />
          {"> Scritching"}
          <br />
          {"> Upload Guidelines"}
          <br />
          {"> Sponsor"}
          <br />
          {"- What Following a Fursuit Does"}
          <br />
          {"> Follow"}
          <br />
          {"- What Following a Maker Does"}
          <br />
          {"> Tag"}
          <br />
          {"- What Tagging a Fursuit Does"}
          <br />
          {"- Tag Completion"}
          <br />
          {"> Favourite"}
          <br />
          {"> Tip"}
          <br />
          {"> Advertise"}
          <br />
          {"> Block"}
          <br />
          {"> Report"}
          <br />
        </Typography>
        {SpacerWithHR}
        <Typography variant="h4" id="landing_page">
          LANDING PAGE
        </Typography>
        <Typography variant="subtitle1">
          Although Scritch has been designed to host strictly SFW Content, the
          Landing Page provides a means for the Website to confirm a User is
          over 18. By clicking “ENTER” the User is agreeing to the Website Terms
          and Conditions.
        </Typography>
        {SpacerWithHR}
        <Typography variant="h4" id="code_conduct">
          CODE OF CONDUCT
        </Typography>
        <Typography variant="subtitle1">
          Website Administrators police all aspects of Scritch User interaction,
          safeguarding them against:
        </Typography>
        <List dense>
          <ListItem>
            Illegal Activity (as laid down by
            <a href="http://www.gov.uk/browse/justice" className={classes.link}>
              {" http://www.gov.uk/browse/justice"}
            </a>
            )
          </ListItem>
          <ListItem>NSFW Activity</ListItem>
          <ListItem>Discrimination</ListItem>
          <ListItem>Harassment</ListItem>
          <ListItem>Identity Theft/Doxing</ListItem>
          <ListItem>Threatening Behaviour</ListItem>
          <ListItem>Gambling</ListItem>
          <ListItem>Spam</ListItem>
        </List>
        <Typography variant="subtitle1">
          So this is as simple as the Code of Conduct gets. If Users don’t do
          anything that relates to any of the above, they will be interacting in
          line with the Code of Conduct!
        </Typography>
        {SpacerWithHR}
        <Typography variant="h4" id="terminology">
          SCRITCH TERMINOLOGY
        </Typography>
        <Paper className={classes.tableRoot}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Aspect</TableCell>
                <TableCell>Term</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {terminologyTableRows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.aspect}
                  </TableCell>
                  <TableCell>{row.term}</TableCell>
                  <TableCell>{row.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        {SpacerWithHR}
        <Typography variant="h4" id="our_promise">
          OUR PROMISE
        </Typography>
        <Paper className={classes.paperQuote}>
          <Typography variant="subtitle1" style={{ fontStyle: "italic" }}>
            Scritch promises to maintain past, present, and future: Convention,
            Maker, and Fursuit Cards to allow a complete chronical of all
            Content, able to be tagged also by Category. The Admin Pool ensures
            User safety and security by keeping all Involvement on
            www.scritch.es/* within the Website Code of Conduct and media in
            line with Content Restrictions below.
          </Typography>
        </Paper>
        {SpacerWithHR}
        <Typography variant="h4" id="your_promise">
          YOUR PROMISE
        </Typography>
        <Paper className={classes.paperQuote}>
          <Typography variant="subtitle1" style={{ fontStyle: "italic" }}>
            You (the User) promise to adhere to the Code of Conduct and Content
            Restrictions put in place to safeguard all Users of the Website.
          </Typography>
        </Paper>
        {SpacerWithHR}
        <Typography variant="h4" id="content_restrictions">
          CONTENT RESTRICTIONS
        </Typography>
        <Typography variant="subtitle1">
          User Content is laid out in the Terms of Use Policy in section:{" "}
          <strong>Acceptable Use; Disclaimer</strong>, however to be clear in
          this document; the Website will maintain SFW content through not
          hosting:
        </Typography>
        <Paper className={classes.tableRoot}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Restriction</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contentRestrictionsRows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.restriction}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        {SpacerWithHR}
        <Typography variant="h4" id="architecture">
          WEBSITE ARCHITECTURE
        </Typography>
        {Spacer}
        <Typography variant="h5">Levels of Scritch User Accounts</Typography>
        <Paper className={classes.tableRoot}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Level</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accountLevelsRows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.level}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        {Spacer}
        <Typography variant="h5">User Level Transition</Typography>
        <Typography variant="subtitle1">
          Users transition between the above levels as shown in the table below:
        </Typography>
        <Paper className={classes.tableRoot}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Start Level</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>End Level</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {levelTransitionsRows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.start_level}
                  </TableCell>
                  <TableCell>{row.action}</TableCell>
                  <TableCell>{row.end_level}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        {Spacer}
        <Typography variant="h5">Involvement Monitoring</Typography>
        <Typography variant="subtitle1">
          Involvement of every user is tracked through discrete algorithms that
          allow periodic review of the Website Owners to amend User Levels
          accordingly.
        </Typography>
        {Spacer}
        <Typography variant="h6">Involvement Action Weighting</Typography>
        <Typography variant="subtitle1">
          User Involvement Actions are weighted in line with the points system
          below. If a Account Owns multiple Fursuits, points weighted against
          actions related to each Fursuit will aggregate to a total points score
          for the Account itself.
        </Typography>
        <Paper className={classes.tableRoot}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell>Effect</TableCell>
                <TableCell>Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {involvementActionsRows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.action}
                  </TableCell>
                  <TableCell>{row.effect}</TableCell>
                  <TableCell>{row.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        {Spacer}
        <Typography variant="h6">Involvement Species</Typography>
        <Typography variant="subtitle1">
          As a User Account Involvement score increases, an Involvement Species
          is assigned in Rank up alphabetically through tiers set by the
          following formula:
        </Typography>
        <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
          Involvement Species User Block = Total Number of Users / Total Number
          of Species
        </Typography>
        <Paper className={classes.paperQuote}>
          <Typography
            variant="subtitle1"
            style={{ fontStyle: "italic", fontWeight: 800 }}
          >
            Example 1
          </Typography>
          <Typography variant="subtitle1" style={{ fontStyle: "italic" }}>
            Total Number of Users: 750
            <br />
            Total Number of Species: 180
            <br />
            750 / 180 = 4.17 (Rounded Down to 4)
            <br />
            Equates to a User Species Block value of 4. Allowing a top heavy top
            user species by addressing the decimal:
            <br />
            4 x 179 = 716 (Everything Above 716 Top User Block) = 34 Zebras
            <br />
          </Typography>
        </Paper>
        {Spacer}
        <Paper className={classes.paperQuote}>
          <Typography
            variant="subtitle1"
            style={{ fontStyle: "italic", fontWeight: 800 }}
          >
            Example 1
          </Typography>
          <Typography variant="subtitle1" style={{ fontStyle: "italic" }}>
            Total Number of Users: 17560
            <br />
            Total Number of Species: 240
            <br />
            17560 / 240 = 73.17 (Rounded Down to 73)
            <br />
            Equates to a User Species Block value of 73. Allowing a top heavy
            top user species by addressing the decimal:
            <br />
            73 x 239 = 17447 (Everything Above 17447 Top User Block) = 113
            Zebras
            <br />
          </Typography>
        </Paper>
        {SpacerWithHR}
        <Typography variant="h4" id="what_can_i_do">
          WHAT CAN I DO WITH SCRITCH
        </Typography>
        <Typography variant="subtitle1">
          Scritch allows the following User involvement with limitations
          illustrated for Accounts under hiatus:
        </Typography>
        <List dense>
          <ListItem>View Thumbnail Previews</ListItem>
          <ListItem>Read Website Documentation</ListItem>
          <ListItem>Register</ListItem>
          <ListItem>Browse</ListItem>
          <ListItem>
            Claim a Fursuit Card{" "}
            <strong>{" (Not Available During Hiatus)"}</strong>
          </ListItem>
          <ListItem>
            Claim a Maker Card{" "}
            <strong>{" (Not Available During Hiatus)"}</strong>
          </ListItem>
          <ListItem>
            Upload <strong>{" (Not Available During Hiatus)"}</strong>
          </ListItem>
          <ListItem>
            Tag <strong>{" (Not Available During Hiatus)"}</strong>
          </ListItem>
          <ListItem>
            Follow <strong>{" (Not Available During Hiatus)"}</strong>
          </ListItem>
          <ListItem>
            Scritch <strong>{" (Not Available During Hiatus)"}</strong>
          </ListItem>
          <ListItem>
            Favourite <strong>{" (Not Available During Hiatus)"}</strong>
          </ListItem>
          <ListItem>
            Private Message <strong>{" (Not Available During Hiatus)"}</strong>
          </ListItem>
          <ListItem>Tip</ListItem>
          <ListItem>Sponsor</ListItem>
          <ListItem>Advertise</ListItem>
          <ListItem>Block</ListItem>
          <ListItem>
            Report <strong>{" (Not Available During Hiatus)"}</strong>
          </ListItem>
        </List>
        {SpacerWithHR}
        <Typography variant="h5">VIEW THUMBNAIL PREVIEWS</Typography>
        <Typography variant="subtitle1">
          Scritch allows thumbnail view of Website Content to allow Unregistered
          User thumbnail preview of content.
        </Typography>
        {SpacerWithHR}
        <Typography variant="h5">READ WEBSITE DOCUMENTATION</Typography>
        <Typography variant="subtitle1">
          Scritch allows perusal of Website Documentation, which includes:
        </Typography>
        <List dense>
          <ListItem>Terms and Conditions</ListItem>
          <ListItem>Privacy Policy</ListItem>
          <ListItem>API Policy</ListItem>
          <ListItem>
            Website User Guide <strong>{" (this Document)"}</strong>
          </ListItem>
          <ListItem>FAQs</ListItem>
        </List>
        {SpacerWithHR}
        <Typography variant="h5">REGISTER</Typography>
        <Typography variant="subtitle1">
          Registering with Scritch through: Telegram, Twitter, and Facebook
          Login credentials is through click of the “LOGIN” button to the top
          right of the Homepage.
        </Typography>
        {SpacerWithHR}
        <Typography variant="h5">BROWSE</Typography>
        <Typography variant="subtitle1">
          Registered Users can browse the following extensive Databases which
          drop down as a sub menu of the Website sidebar when the User clicks
          the “Browse” menu item:
        </Typography>
        <List dense>
          <ListItem>Media</ListItem>
          <ListItem>Fursuit</ListItem>
          <ListItem>Maker</ListItem>
          <ListItem>Events</ListItem>
        </List>
        <Typography variant="subtitle1">
          Each Database has been furnished with a custom set of Filters and Sort
          functions, allowing users to find what they are looking for with only
          a small amount of known Data Fields, these are as follows:
        </Typography>
        {Spacer}
        <Typography variant="h6">Media Filter Data Fields</Typography>
        <Paper className={classes.tableRoot}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Filter</TableCell>
                <TableCell>Results Display</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mediaFiltersRows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.filter}
                  </TableCell>
                  <TableCell>{row.result}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        {Spacer}
        <Typography variant="h6">Media Sort Data Fields</Typography>
        <Paper className={classes.tableRoot}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Sort</TableCell>
                <TableCell>Results Display</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mediaSortRows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.sort}
                  </TableCell>
                  <TableCell>{row.result}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        {SpacerWithHR}
        <Typography variant="h5">CLAIM A FURSUIT CARD</Typography>
        <Typography variant="subtitle1">
          A Account can Claim one Fursuit Card a day (this restriction has been
          put in place to safeguard against misuse).
          <br />
          Only an unclaimed Fursuit Card can be claimed by a Account and must
          only be claimed by Accounts that <strong>{" currently"}</strong> own
          them in real life.
          <br />
          To claim a Fursuit Card, locate a Fursuit from the Fursuit Database
          through the Browse Service of the Website, then view the related
          Fursuit Card in full screen. You will see a “Claim” button; by
          clicking this, you will presented with…
        </Typography>
        {SpacerWithHR}
        <Typography variant="h5">CLAIM A MAKER CARD</Typography>
        <Typography variant="subtitle1">
          A Account can claim only one Maker Card (this restriction has been put
          in place to safeguard against misuse).
          <br />
          Only an unclaimed Maker Card can be claimed by a Account and Maker
          Cards must only be claimed by Accounts that are/were owned by the
          Maker Studio in real life.
          <br />
          To claim a Maker Card, locate a Maker from the Maker Database through
          the Browse Service of the Website, then view the related Maker Card in
          full screen. You will see a “Claim” button; by clicking this, you will
          presented with…
        </Typography>
        {SpacerWithHR}
        <Typography variant="h5">UPLOAD</Typography>
        <Typography variant="subtitle1">
          Any Account not under Hiatus can Upload media files to Scritch. By
          Uploading the media to Scritch you grant the Website the ability to
          host the Content to support all User Involvement.
          <br />
          Accounts that are owned by the media creator in real life are best
          placed to Upload, with the Tagging Service then able to notify Card
          Owners and link Website Assets held in its Databases.
          <br />
          On Uploading media to Scritch, an Event and Edition must be assigned
          or a Category selected (if the media was not captured at a specific
          Event Edition), this is because the Uploader is the most likely to
          know where the media was captured.
          <br />
          There is no limit to how many articles of media can be uploaded to
          Scritch, however guidelines apply to media Uploaded onto the Website,
          which safeguards User exposure to inappropriate Content listed out in
          Content Restrictions.
        </Typography>
        <Typography variant="h6"> Upload Guidelines</Typography>
        <Typography variant="subtitle1">
          Additional Upload guidelines to maximise the accuracy and
          effectiveness of Scritch are as follows:
        </Typography>
        <Paper className={classes.tableRoot}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Guideline</TableCell>
                <TableCell>Guidance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uploadGuidelinesRows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.guideline}
                  </TableCell>
                  <TableCell>{row.guidance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        {SpacerWithHR}
        <Typography variant="h5">SCRITCHING</Typography>
        <Typography variant="subtitle1">
          Any Registered User can show their like of Content by “Scritching” it.
          All Scritches are recorded and influence the hierarchy of Assets that
          are linked to the Content along with its Rating on the Website. To
          Scritch a Content, click the Scritch icon indicated by a Paw Print.
        </Typography>
        <Typography variant="h5">SCRITCHING</Typography>
        <Typography variant="subtitle1">
          Any Registered User can choose to Sponsor Scritch, which unlocks the
          following additional Services for their Account:
        </Typography>
        <List dense>
          <ListItem>Ability to Favourite Content</ListItem>
          <ListItem>Organise Favourited Content in Custom Galleries</ListItem>
          <ListItem>Follow Fursuit Cards</ListItem>
          <ListItem>Follow Maker Cards</ListItem>
          <ListItem>Toggle Advertisement Visibility</ListItem>
        </List>
        <Typography variant="subtitle1">
          To Sponsor Scritch, navigate to the Sponsor area of the sidebar and
          click “Become a Sponsor!”, then follow the on screen prompts.
        </Typography>
        <Typography variant="h5">FOLLOW</Typography>
        <Typography variant="subtitle1">
          A Sponsor can choose to Follow a:
        </Typography>
        <List dense>
          <ListItem>Fursuit</ListItem>
          <ListItem>Maker (Phase 2)</ListItem>
          <ListItem>Category (Phase 2)</ListItem>
          <ListItem>Convention (Phase 2)</ListItem>
        </List>
        <Typography variant="h6">What Following a Fursuit Does</Typography>
        <Typography variant="subtitle1">
          Following a Fursuit raises the Fursuit Card Follower metric by 1 and
          Notifies the Fursuit Card Owner that their Fursuit has been Followed.
          <br />
          A Follower of a Fursuit will receive Notifications of any Content that
          the Fursuit Card is linked to from that point on.
          <br />
          To Follow Fursuits, locate them from the Fursuit Database, then view
          the related Fursuit Card full screen. You will see a “Follow” button;
          by clicking this, you will presented with…
        </Typography>
        {SpacerWithHR}
        <Typography variant="h5">TAG</Typography>
        <Typography variant="subtitle1">
          In order to Tag Content, navigate to the Tagging Console in the
          sidebar of Scritch.
          <br />
          The Tagging console allows sort by Tag completion of Content (See Tag
          Completion section of this guide).
        </Typography>
        <Typography variant="h6">What Tagging a Fursuit Does</Typography>
        <Typography variant="subtitle1">
          Tagging a Fursuit in Content creates a Website link between the
          Content and Fursuit Card and Notifies the Fursuit Card Owner that
          their Fursuit has been Tagged (via Dashboard Notification).
          <br />
          Also, Tagging a Fursuit Notifies Followers of the Fursuit Card that
          their Followed Fursuit has new Content to be seen.
        </Typography>
        {Spacer}
        <Typography variant="h6">Tag Completion</Typography>
        <Typography variant="subtitle1">
          All Content Uploaded to Scritch holds a Tag Completion percentage,
          this is broken down by Data Fields as follows:
        </Typography>
        <Paper className={classes.tableRoot}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Data Field</TableCell>
                <TableCell>Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tagCompletionRows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.field}
                  </TableCell>
                  <TableCell>{row.percentage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Typography variant="subtitle1">
          The goal is for all Content to achieve 100% Tag Completion, which
          means all Assets have been Tagged correctly.
        </Typography>
        {SpacerWithHR}
        <Typography variant="h5">FAVOURITE</Typography>
        <Typography variant="subtitle1">
          A sponsor can choose to favourite an article of media.
          <br />
          Favouriting Content increases the Favourite count of the Uploader
          Account and locates the Content in the customisable Favourites Gallery
          area of the User that Favourited it.
          <br />
          Sponsors can sort Favourites into albums to allow custom gallery
          organisation relevant to their interests.
        </Typography>
        {SpacerWithHR}
        <Typography variant="h5">TIP</Typography>
        <Typography variant="subtitle1">
          Any Registered User can choose to Tip Scritch.
          <br />
          Tipping is greatly appreciated and supports future development of
          additional Services.
          <br />
          To Tip Scritch, navigate to the Tip menu item of the Website sidebar
          and...
        </Typography>
        {SpacerWithHR}
        <Typography variant="h5">ADVERTISE</Typography>
        <Typography variant="subtitle1">
          Any Registered User can choose to Advertise on Scritch.
          <br />
          Advertisements must adhere to the Website Code of Conduct and be Furry
          related.
          <br />
          To Advertise with Scritch, click Ads &amp; Social in the Website
          header and and...
        </Typography>
        {SpacerWithHR}
        <Typography variant="h5">BLOCK</Typography>
        <Typography variant="subtitle1">
          Any Registered User can choose to Block another User on Scritch to
          prevent Following and contact whilst the Block is active.
          <br />
          Blocked users can be unblocked through the…
          <br />
          To Block a Account...
        </Typography>
        {SpacerWithHR}
        <Typography variant="h5">REPORT</Typography>
        <Typography variant="subtitle1">
          Scritch will draw upon its Admin Pool to handle any Report Tickets
          generated by Website Users.
          <br />
          Any Registered user can submit a Report to challenge anything that
          does not adhere to the Scritch Code of Conduct or anything that is
          incorrect on the Website.
          <br />
          To submit a Report, click...
          <br />
          All reports are handled by the Admin Pool in a timely fashion relative
          to the number of Tickets received and the number of Admins in the
          Admin Pool.
        </Typography>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(WebsiteUserGuide);
