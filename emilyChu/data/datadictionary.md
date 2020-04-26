data dictionary

## global (applieds to general.csv and moment.csv)

*comment_id*
unique reference id of reaction to the musical performance recorded as a comment. can be a general comment about the performance overall, or a comment about a particular moment in the performance. follows structure GENCHAR#.## OR MOMCHAR#.##

*role*
perspective of the author of (genchar1). possible values: class Member OR non-performing [pianist or cellist] OR performing [pianist or cellist] + #

*mp*
whether the comment is about music (musicians’ thoughts, feelings or actions) or performers (acting as agents). possible values: M, P, M/P, M*, P*, neither

*statement_target*
which performer the comment (genchar1) under review is about

*sentiment*
whether the comment is positive or negative. Possible values: pos, neg, descriptive, mixed, other

*trial_categories*
type of trial category. Possible values: judgement of interpretation, judgement of collaboration, judgement of collaboration / interpretation, description of interpretation, description of collaboration, description of interpretation / collaboration, neither, other

*rater1_reassigned*

*rater2_reassigned*

*rater1_raw*

*rater2_raw*

*commentator_instrument*
the instrument that the author of the comment under review plays. Possible values: Piano, String, Both, Both?, performing cellist

*rater1*
role of the first rater

*rater2*
role of the second rater

## general.csv

*genchar1*
comment under review provided by individual referenced in (role). it is an overall reaction to the musical performance by this individual. text field.

*rating1.genchar1.rating*
agreement of the first rater who reviewed this comment. rating from scale of 1-5 (1=strongly disagree, 5=strongly agree). integer value.

*rating1.genchar1.comment*
the comment provided by the first rater who reviewed this comment to explain their agreement or disagreement. text field.

*rating1.genchar1.type*
label describing the nature of the comment provided by the first rater. Possible values: No comment, elaboration, affirmation, with qualifications, disagrees with basis for claim.

*rating2.genchar1.rating*
agreement of the second rater who reviewed this comment. rating from scale of 1-5 (1=strongly disagree, 5=strongly agree). integer value.

*rating2.genchar1.comment*
the comment provided by the second rater who reviewed this comment to explain their agreement or disagreement. text field.

*rating2.genchar1.type*
label describing the nature of the comment provided by the second rater. Possible values: No comment, elaboration, affirmation, with qualifications, disagrees with basis for claim.

## moment.csv

*mom1.char*
comment under review provided by individual referenced in (role). it is a reaction to a specific moment in the musical performance. text field.

*rating1.mom1.rating*
agreement of the first rater who reviewed (mom1.char). rating from scale of 1-5 (1=strongly disagree, 5=strongly agree). integer value.

*rating1.mom1.comment*
the comment provided by the first rater who reviewed this comment to explain their agreement or disagreement. text field.

*rating1.mom1.type*
label describing the nature of the comment provided by the first rater. Possible values: No comment, elaboration, affirmation, with qualifications, disagrees with basis for claim.

*rating2.mom1.rating*
agreement of the second rater who reviewed this comment. rating from scale of 1-5 (1=strongly disagree, 5=strongly agree). integer value.

*rating2.mom1.comment*
the comment provided by the second rater who reviewed this comment to explain their agreement or disagreement. text field.

*rating2.mom1.type*
label describing the nature of the comment provided by the second rater. Possible values: No comment, elaboration, affirmation, with qualifications, disagrees with basis for claim.

## moment-details.csv

*MOM.STARTBAR*
Start bar or measure of piece to which the moment referenced in comment_id is tied to. integer value.

*MOM.STARTBEAT*
Start beat to which the moment referenced in comment_id is tied to. integer value. Possible values: 1,2,3,4

*MOM.ENDBAR*
End bar or measure of piece to which the moment referenced in comment_id is tied to. integer value.

*MOM.ENDBEAT*
End beat to which the moment referenced in comment_id is tied to. integer value. Possible values: 1,2,3,4

*MOM.CELLO*

*MOM.PIANOLEFT*

*MOM.PIANORIGHT*

*heard*
whether the author of mom1char has heard the piece before. Possible values: yes/no

*played*
whether the author of mom1char has played the piece before. Possible values: yes/no
