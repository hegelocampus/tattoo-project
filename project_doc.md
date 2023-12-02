# Tattoo scheduling helper

## Clients are able to:
## Request a tattoo from available flash:
- Can view available flash and 
- Should be able to submit a ranked list of desired flash
- Submit a tattoo request form with desired flash
- Submit a deposit for a tattoo 
	- Maybe do this externally?
	- Workflow could be:
		- Tell client to make deposit to Venmo/whatever
		- Send emails:
			- To client to confirm apt request
			- to Tattoo artist to check for deposit
		- Wait for tattoo artist to confirm deposit
		- Send email to client to let them know their deposit has been received and their appointment is on the books

- Once deposit has been confirmed non-repeatable flash should be removed from the available flash designs
- Tattoo artists also need to be able to modify appointments that have been made
## Submit a custom tattoo request:
- Should be able to upload reference pictures

DB items:
- User types:
	- Tattoo artist (can be client too?)
	- Client
- Tattoo request
- Tattoo flash
	- Owner (who has full edit access)
	- `ImageLink` Link to CDN picture of design
	- `IsRepeatable` Is the design repeatable?
	- `Description` Description of flash
	- `Size` Size range
	- `Placement` Placement expectations (arms, legs, chest, tramp stamp, etc.)
	- `isAvaliable` is it available to be tattooed
	- `price` price estimate
- Tattoo appointment
	- Belongs to a client
	- Has one tattoo flash (maybe more than one? That would make flash logic much harder to deal with)
-


# Development diary
- Starting with MongoDB and very streamlined down model.
- MVP for first version of this looks like this:
	- Only accommodate for a single tattoo artist.
		- This makes the DB much easier to deal with.
	- Flash gallery for available flash.
	- Clients are able to request flash without making an account.
		- This reduces the amount of features we can provide, but makes the initial launch *much* easier.
