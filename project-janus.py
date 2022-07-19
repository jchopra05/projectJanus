#importing firebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db


#fetching private key
cred = credentials.Certificate("path/to/project-janus-db4a5-firebase-adminsdk-1qb11-149cfc0901.json")
firebase_admin.initialize_app(cred)

ref = db.reference('instruments/')

#def addInstrument(inst_name):
instrument_ref = ref.child('inst_name')
daily_ref = ref.child('test')
    #update data
    


#def getDaily():

#//def getWeekly():

#//def getMonthly():

