<?php

class RestApi {
    /**
     * Rest class constructor function
     */
    public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_rest_apis' ] );
    }

    /**
     * Register rest api
     * @return void
     */
    public function register_rest_apis() {

        register_rest_route( Catalog()->rest_namespace, '/save_enquiry', [
            'methods'               => \WP_REST_Server::ALLMETHODS,
            'callback'              => [ $this, 'save_settings' ],
            'permission_callback'   => [ $this, 'api_permission' ]
        ]);

        register_rest_route( Catalog()->rest_namespace, '/save_enquiry', [
            'methods'               => \WP_REST_Server::ALLMETHODS,
            'callback'              => [ $this, 'save_settings' ],
            'permission_callback'   => [ $this, 'api_permission' ]
        ]);
	}

    /**
     * ChatBuddy rest api permission functions
     * @return bool
     */
	public function api_permission() {
		return current_user_can('manage_options');
	}

    /**
     * Save global settings
     * @param mixed $request
     * @return \WP_Error|\WP_REST_Response
     */
    public function save_settings( $request ) {
        
        $requestInfo  = $request->get_param( 'info' );

        return rest_ensure_response([
            'success' => true,
            'message' => 'Saved Successfully',
        ]);
	}
}