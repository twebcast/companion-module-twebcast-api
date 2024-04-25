"use strict";

const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const { ApiClient } = require('./api.js')
const { configFields } = require('./config')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		console.log("init twebcast")
		super(internal)
	}

	async init(config) {
		this.config = config
    this.log("info", JSON.stringify(config))
		this.updateStatus(InstanceStatus.Ok)
		this.log('info', 'Twebcast module initiating')
		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
	}
	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.config = config
    // carry out actions when the configuration is updated 
    this.apiClient = new ApiClient(config)
  
    this.log("info", this.apiClient.apiKey)

    
  
  }




	// Return config fields for web config
	getConfigFields() {
    return configFields()
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
