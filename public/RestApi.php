<?php

class PublicRestApi {
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

        register_rest_route( 'chatbuddy', '/action', [
            'methods'               => \WP_REST_Server::ALLMETHODS,
            'callback'              => [ $this, 'handle_action' ],
            'permission_callback'   => [ $this, 'api_permission' ]
        ]);
	}

    /**
     * ChatBuddy rest api permission functions
     * @return bool
     */
	public function api_permission() {
		return true;
	}

    /**
     * Handle Action
     * @param mixed $request
     * @return \WP_Error|\WP_REST_Response
     */
    public function handle_action( $request ) {
        
        $action  = $request->get_param( 'action' );
        $value   = $request->get_param( 'value' );

        do_action( 'chatbuddy_action_submit', $action, $value );

        return rest_ensure_response([
            'success' => true,
        ]);
	}
}